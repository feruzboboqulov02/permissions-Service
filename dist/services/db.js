"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
exports.insertPermission = insertPermission;
exports.getPermissionsByApiKey = getPermissionsByApiKey;
const pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
async function insertPermission(apiKey, module, action) {
    await exports.pool.query(`INSERT INTO permissions (api_key, module, action) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING`, [apiKey, module, action]);
}
async function getPermissionsByApiKey(apiKey) {
    const res = await exports.pool.query(`SELECT module, action FROM permissions WHERE api_key = $1`, [apiKey]);
    return res.rows;
}
