import pool from 'lib/db';

export default async function getChannelMessages(req, res) {
  const { cid } = req.query;
  const query =
    'SELECT * FROM messages INNER JOIN users ON users.user_uid=messages.author_uid WHERE channel_uid=$1 ORDER BY messages.created_at';
  const values = [cid];
  const result = await pool.query(query, values);

  res.status(200).send({
    messages: result.rows,
  });
}
