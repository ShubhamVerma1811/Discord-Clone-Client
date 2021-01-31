import pool from 'lib/db';
// JOIN A SERVER
export default async function joinServer(req, res) {
  const { userID, serverID } = req.body;

  const query =
    'INSERT INTO user_servers (server_uid,user_uid) VALUES ($1,$2) RETURNING *';
  const values = [serverID, userID];
  const result = await pool.query(query, values);

  res.status(200).send({
    joinedServer: result.rows,
  });
}
