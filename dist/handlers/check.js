"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCheck = handleCheck;
const cache_js_1 = require("../services/cache.js");
const db_js_1 = require("../services/db.js");
const logger_js_1 = require("../lib/logger.js");
async function handleCheck(req, respond) {
    try {
        (0, logger_js_1.logEvent)('check:received', req);
        const { apiKey, module, action } = req;
        // 1. Try to get from KV
        let permissions = await (0, cache_js_1.getCachedPermissions)(apiKey);
        // 2. If not in KV, get from DB and update KV
        if (!permissions) {
            const result = await (0, db_js_1.query)('SELECT module, action FROM permissions WHERE api_key = $1', [apiKey]);
            permissions = result.rows;
            await (0, cache_js_1.setCachedPermissions)(apiKey, permissions);
            (0, logger_js_1.logEvent)('check:cacheUpdated', { apiKey });
        }
        // 3. Check if permission exists
        const allowed = permissions.some((p) => p.module === module && p.action === action);
        respond({ allowed });
    }
    catch (err) {
        (0, logger_js_1.logError)('check:error', err);
        respond({
            error: {
                code: 'db_error',
                message: err.message || 'Internal error'
            }
        });
    }
}
