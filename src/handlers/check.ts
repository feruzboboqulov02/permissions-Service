import { getCachedPermissions, setCachedPermissions } from '../services/cache.js';
import { query } from '../services/db.js';
import { ErrorCode } from '../lib/types.js';
import { logEvent, logError } from '../lib/logger.js';

interface CheckRequest {
  apiKey: string;
  module: string;
  action: string;
}

interface CheckResponse {
  allowed: boolean;
}

export async function handleCheck(req: CheckRequest, respond: (res: CheckResponse | { error: { code: ErrorCode; message: string } }) => void) {
  try {
    logEvent('check:received', req);

    const { apiKey, module, action } = req;

    // 1. Try to get from KV
    let permissions = await getCachedPermissions(apiKey);

    // 2. If not in KV, get from DB and update KV
    if (!permissions) {
      const result = await query('SELECT module, action FROM permissions WHERE api_key = $1', [apiKey]);
      permissions = result.rows;
      await setCachedPermissions(apiKey, permissions);
      logEvent('check:cacheUpdated', { apiKey });
    }

    // 3. Check if permission exists
    const allowed = permissions.some((p) => p.module === module && p.action === action);

    respond({ allowed });
  } catch (err: any) {
    logError('check:error', err);
    respond({
      error: {
        code: 'db_error',
        message: err.message || 'Internal error'
      }
    });
  }
}
