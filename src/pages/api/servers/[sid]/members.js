import db from 'lib/db';

export default async function getServerMembers(req, res) {
  const { sid } = req.query;

  const query =
    'SELECT * FROM user_servers INNER JOIN users ON user_servers.user_uid = users.user_uid WHERE server_uid=$1';
  const values = [sid];

  const { rows } = await db.query(query, values);

  const data = rows.map((obj) => {
    const { us_uid, server_uid, ...user } = obj;
    return {
      us_uid,
      server_uid,
      user,
    };
  });

  res.send(data);
}
