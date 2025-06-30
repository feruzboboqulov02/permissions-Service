"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRevoke = void 0;
const db_1 = require("../services/db");
const cache_1 = require("../services/cache");
const logger_1 = require("../utils/logger");
const handleRevoke = async (msg) => {
    console.log('Revoke handler triggered');
    try {
        const { apiKey, module, action } = JSON.parse(msg.data.toString());
        (0, logger_1.log)('revoke:received', { apiKey, module, action });
        await (0, db_1.deletePermission)(apiKey, module, action);
        const permissions = await (0, db_1.getPermissionsByApiKey)(apiKey);
        await (0, cache_1.setCachedPermissions)(apiKey, permissions);
        (0, logger_1.log)('revoke:updated_cache', { apiKey, permissionCount: permissions.length });
        msg.respond(Buffer.from(JSON.stringify({ status: 'ok' })));
    }
    catch (err) {
        (0, logger_1.log)('revoke:error', { message: err.message });
        msg.respond(Buffer.from(JSON.stringify({ error: { code: 'db_error', message: err.message } })));
    }
};
exports.handleRevoke = handleRevoke;
