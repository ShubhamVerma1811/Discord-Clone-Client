import jwt from 'jsonwebtoken';
import pool from 'lib/db';

export default async function servers(req, res) {
  try {
    const { authorization } = req.headers;
    const accessToken = authorization.split(' ')[1];
    const { userID } = jwt.verify(accessToken, process.env.ACCESS_TOKEN);
    const query = ` SELECT * FROM ( ( users INNER JOIN user_servers ON users.user_uid = user_servers.user_uid ) INNER JOIN servers ON servers.server_uid = user_servers.server_uid ) WHERE users.user_uid=$1`;
    const values = [userID];
    const result = await pool.query(query, values);
    res.status(200).send({
      servers: result.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: err.message,
    });
  }
}
