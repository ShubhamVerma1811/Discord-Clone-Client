import pool from 'lib/db';

const messagesHandler = async (req, res) => {
  const { context, channelID, authorID, createdAt, updatedAt } = req.body;

  const query =
    'INSERT INTO messages (context,channel_uid,author_uid,created_at,updated_at) VALUES ($1,$2,$3,$4,$5) RETURNING *';

  const values = [context, channelID, authorID, createdAt, updatedAt];

  const result = await pool.query(query, values);
  res.status(200).send({
    createdMsg: result.rows,
  });
};

export default messagesHandler;
