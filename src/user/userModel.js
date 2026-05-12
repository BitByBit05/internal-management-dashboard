import pool from "../config/db.js";

export async function register(params) {
  const query = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`;
  await pool.query(query, params);
}

export async function checkExisting(email) {
  const query = `SELECT * FROM users WHERE email=$1`;
  const { rows } = await pool.query(query, [email]);
  return rows.length > 0;
}
