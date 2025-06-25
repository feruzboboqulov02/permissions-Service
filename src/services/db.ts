import { Pool } from 'pg';
import { Permission } from '../lib/types';
import dotenv from 'dotenv';
dotenv.config();

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export async function insertPermission(apiKey: string, module: string, action: string): Promise<void> {
  await pool.query(
    `INSERT INTO permissions (api_key, module, action) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING`,
    [apiKey, module, action]
  );
}

export async function getPermissionsByApiKey(apiKey: string): Promise<Permission[]> {
  const res = await pool.query(
    `SELECT module, action FROM permissions WHERE api_key = $1`,
    [apiKey]
  );
  return res.rows;
}