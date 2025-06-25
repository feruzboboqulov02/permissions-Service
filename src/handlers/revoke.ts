import { Msg } from 'nats';
import { GrantRevokeRequest, SuccessResponse } from '../lib/types';
import { deletePermission, getPermissionsByApiKey } from '../services/db';
import { setCachedPermissions } from '../services/cache';
import { log } from '../utils/logger';

export const handleRevoke = async (msg: Msg) => {
    console.log('Revoke handler triggered');

  try {
    const { apiKey, module, action } = JSON.parse(msg.data.toString()) as GrantRevokeRequest;
    log('revoke:received', { apiKey, module, action });

    await deletePermission(apiKey, module, action);
    const permissions = await getPermissionsByApiKey(apiKey);

    await setCachedPermissions( apiKey, permissions);

    log('revoke:updated_cache', { apiKey, permissionCount: permissions.length });

    msg.respond(Buffer.from(JSON.stringify({ status: 'ok' } as SuccessResponse)));
  } catch (err: any) {
    log('revoke:error', { message: err.message });
    msg.respond(Buffer.from(JSON.stringify({ error: { code: 'db_error', message: err.message } })));
  }
};
