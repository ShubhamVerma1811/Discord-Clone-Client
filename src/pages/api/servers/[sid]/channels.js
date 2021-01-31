// /server/:sid/channels
// Get server channels
import pool from 'lib/db';

export default async function server_channels(req, res) {
  if (req.method === 'GET') {
    const { sid } = req.query;
    try {
      if (sid === 'undefined') res.status(501).end();
      else {
        const query = 'SELECT * FROM channels WHERE server_uid=$1';
        const values = [sid];
        const result = await pool.query(query, values);

        res.status(200).send({
          channels: result.rows,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }
}
