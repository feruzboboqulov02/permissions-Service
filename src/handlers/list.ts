import { getCachedPermissions, setCachedPermissions } from '../services/cache.js';
import { query } from '../services/db.js';
import { Permission, ErrorCode } from '../lib/types.js';
import { logEvent, logError } from '../lib/logger.js';

interface ListRequest {
  apiKey: string;
}

interface ListResponse {
  permissions: Permission[];
}

export async function handleList(
  req: ListRequest,
  respond: (res: ListResponse | { error: { code: ErrorCode; message: string } }) => void
) {
  try {
    logEvent('list:received', req);
    const { apiKey } = req;

    // 1. Try cache
    let permissions = await getCachedPermissions(apiKey);

    // 2. Fallback to DB
    if (!permissions) {
      const result = await query('SELECT module, action FROM permissions WHERE api_key = $1', [apiKey]);
      permissions = result.rows || [];

      // 3. Update cache
      await setCachedPermissions(apiKey, permissions);
      logEvent('list:cacheUpdated', { apiKey });
    }

    respond({ permissions });
  } catch (err: any) {
    logError('list:error', err);
    respond({
      error: {
        code: 'db_error',
        message: err.message || 'Unexpected error'
      }
    });
  }
}
