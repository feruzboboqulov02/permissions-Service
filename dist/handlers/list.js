"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleList = handleList;
const cache_js_1 = require("../services/cache.js");
const db_js_1 = require("../services/db.js");
const logger_js_1 = require("../lib/logger.js");
async function handleList(req, respond) {
    try {
        (0, logger_js_1.logEvent)('list:received', req);
        const { apiKey } = req;
        // 1. Try cache
        let permissions = await (0, cache_js_1.getCachedPermissions)(apiKey);
        // 2. Fallback to DB
        if (!permissions) {
            const result = await (0, db_js_1.query)('SELECT module, action FROM permissions WHERE api_key = $1', [apiKey]);
            permissions = result.rows || [];
            // 3. Update cache
            await (0, cache_js_1.setCachedPermissions)(apiKey, permissions);
            (0, logger_js_1.logEvent)('list:cacheUpdated', { apiKey });
        }
        respond({ permissions });
    }
    catch (err) {
        (0, logger_js_1.logError)('list:error', err);
        respond({
            error: {
                code: 'db_error',
                message: err.message || 'Unexpected error'
            }
        });
    }
}
