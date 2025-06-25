"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
exports.query = query;
exports.insertPermission = insertPermission;
exports.deletePermission = deletePermission;
exports.getPermissionsByApiKey = getPermissionsByApiKey;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.pool = new pg_1.Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
async function query(text, params) {
    return exports.pool.query(text, params);
}
async function insertPermission(apiKey, module, action) {
    await exports.pool.query(`INSERT INTO permissions (api_key, module, action) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING`, [apiKey, module, action]);
}
async function deletePermission(apiKey, module, action) {
    await exports.pool.query(`DELETE FROM permissions WHERE api_key = $1 AND module = $2 AND action = $3`, [apiKey, module, action]);
}
async function getPermissionsByApiKey(apiKey) {
    const res = await exports.pool.query(`SELECT module, action FROM permissions WHERE api_key = $1`, [apiKey]);
    return res.rows;
}
