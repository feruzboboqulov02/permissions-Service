import { pool } from './src/services/db';

(async () => {
try {
console.log("Connecting to DB with credentials:", {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  passwordType: typeof process.env.DB_PASSWORD,
});

const res = await pool.query('SELECT NOW()');
console.log('DB connected:', res.rows[0]);
process.exit(0);
} catch (err) {
console.error('DB error:', err);
process.exit(1);
}
})();