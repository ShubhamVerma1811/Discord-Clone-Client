import jwt from 'jsonwebtoken';

export default async function verify(req, res) {
  const { authorization } = req.headers;
  const accessToken = authorization.split(' ')[1];

  try {
    jwt.verify(accessToken, process.env.ACCESS_TOKEN);
    res.status(200).send({
      verified: true,
    });
  } catch (err) {
    console.error(err);
    res.status(200).send({
      verified: false,
    });
  }
}
