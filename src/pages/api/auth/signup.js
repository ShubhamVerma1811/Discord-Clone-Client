import bcrypt from 'bcrypt';
import pool from 'lib/db';

export default async function signUp(req, res) {
  const { username, email, password, created_at, updated_at } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const query = `INSERT INTO users (username, email, hash,created_at,updated_at) VALUES ($1,$2,$3,$4,$5) RETURNING *`;
  const values = [username, email, hash, created_at, updated_at];

  try {
    await pool.query(query, values);

    res.status(200).send({
      message: 'Success',
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error check logs');
    return false;
  }
}
