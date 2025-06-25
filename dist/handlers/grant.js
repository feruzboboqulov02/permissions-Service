"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGrant = void 0;
const db_1 = require("../services/db");
const cache_1 = require("../services/cache");
const logger_1 = require("../utils/logger");
const handleGrant = async (msg) => {
    try {
        const data = JSON.parse(msg.data.toString());
        const { apiKey, module, action } = data;
        (0, logger_1.log)('grant:received', data);
        await (0, db_1.insertPermission)(apiKey, module, action);
        const permissions = await (0, db_1.getPermissionsByApiKey)(apiKey);
        await (0, cache_1.setCachedPermissions)(apiKey, permissions);
        (0, logger_1.log)('grant:updated_cache', { apiKey, permissionCount: permissions.length });
        const response = { status: 'ok' };
        msg.respond(Buffer.from(JSON.stringify(response)));
    }
    catch (err) {
        (0, logger_1.log)('grant:error', { message: err.message });
        msg.respond(Buffer.from(JSON.stringify({ error: { code: 'grant_error', message: err.message } })));
    }
};
exports.handleGrant = handleGrant;
