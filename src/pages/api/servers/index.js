import pool from 'lib/db';
export default async function server(req, res) {
  // Creating a Server
  if (req.method === 'POST') {
    const { name, description, userID, createdAt, updatedAt } = req.body;

    const query =
      'INSERT INTO servers (name,description,author_uid,created_at,updated_at) VALUES ($1,$2,$3,$4,$5) RETURNING *';
    const values = [name, description, userID, createdAt, updatedAt];
    const result = await pool.query(query, values);

    const query2 =
      'INSERT INTO user_servers (server_uid,user_uid) VALUES ($1,$2)';
    const values2 = [result.rows[0].server_uid, userID];
    await pool.query(query2, values2);

    res.status(200).send({
      createdServer: result.rows,
    });
  } else {
    res.status(405).send({
      message: 'Method Not Allowed',
    });
  }
}
