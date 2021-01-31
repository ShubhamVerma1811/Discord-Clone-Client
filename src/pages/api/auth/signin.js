import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from 'lib/db';

export default async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const query = 'SELECT * FROM users WHERE email=$1';
    const values = [email];
    const result = await pool.query(query, values);
    const user = result.rows[0];
    if (!user) {
      res.status(404).send({
        message: 'Failure',
      });
    } else {
      if (await bcrypt.compare(password, user.hash)) {
        const accessToken = jwt.sign(
          {
            userID: user.user_uid,
          },
          process.env.ACCESS_TOKEN
        );
        res.status(200).send({
          message: 'Success',
          accessToken,
          user,
        });
      } else {
        res.status(403).send({
          message: 'Failure',
        });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error');
  }
}
