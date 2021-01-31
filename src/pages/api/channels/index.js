import pool from 'lib/db';

export default async function channel(req, res) {
  // CREATING NEW CHANNEL
  if (req.method === 'POST') {
    try {
      const { name, userID, serverID, createdAt, updatedAt } = req.body;

      const query =
        'INSERT INTO channels (name,author_uid,server_uid,created_at,updated_at) VALUES ($1,$2,$3,$4,$5) RETURNING *';
      const values = [name, userID, serverID, createdAt, updatedAt];
      const result = await pool.query(query, values);
      res.status(200).send({
        createdChannel: result.rows,
      });
    } catch (err) {
      console.error(err);
    }
  } else {
    res.status(405).send({
      message: 'Method Not Allowed',
    });
  }
}
