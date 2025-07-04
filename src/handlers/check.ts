import { Msg } from 'nats';
import { CheckRequest, CheckResponse } from '../lib/types';
import { getCachedPermissions } from '../services/cache';


const permissionMap = new Map<string, Set<string>>();

// Helper to form key
function makeKey(module: string, action: string): string {
  return `${module}:${action}`;
}


async function ensurePermissionsLoaded(apiKey: string) {
  if (permissionMap.has(apiKey)) return;

  const permissions = await getCachedPermissions(apiKey);
  if (!permissions) {
    permissionMap.set(apiKey, new Set()); 
    return;
  }

  const keySet = new Set<string>();
  for (const p of permissions) {
    keySet.add(makeKey(p.module, p.action));
  }

  permissionMap.set(apiKey, keySet);
}

export async function handleCheck(msg: Msg) {
  try {
    const req = JSON.parse(msg.data.toString()) as CheckRequest;

    await ensurePermissionsLoaded(req.apiKey);

    const allowedSet = permissionMap.get(req.apiKey) ?? new Set();
    const isAllowed = allowedSet.has(makeKey(req.module, req.action));

    const res: CheckResponse = { allowed: isAllowed };
    msg.respond(Buffer.from(JSON.stringify(res)));
  } catch (e) {
    msg.respond(
      Buffer.from(
        JSON.stringify({
          error: { code: 'invalid_request', message: 'Invalid check request' }
        })
      )
    );
  }
}
