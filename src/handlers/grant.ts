import { Msg } from 'nats';
import { GrantRevokeRequest, SuccessResponse } from '../lib/types';
import { insertPermission, getPermissionsByApiKey } from '../services/db';
import { setCachedPermissions } from '../services/cache';
import { log } from '../utils/logger';

export const handleGrant = async (msg: Msg) => {
try {
const data = JSON.parse(msg.data.toString()) as GrantRevokeRequest;
const { apiKey, module, action } = data;
log('grant:received', data);

await insertPermission(apiKey, module, action);

const permissions = await getPermissionsByApiKey(apiKey);

await setCachedPermissions(apiKey, permissions);

log('grant:updated_cache', { apiKey, permissionCount: permissions.length });

const response: SuccessResponse = { status: 'ok' };
msg.respond(Buffer.from(JSON.stringify(response)));
} catch (err: any) {
log('grant:error', { message: err.message });
msg.respond(
Buffer.from(JSON.stringify({ error: { code: 'db_error', message: err.message } }))
);
}
};