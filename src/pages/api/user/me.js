import verifyToken from 'services/verifyToken';

export default async function (req, res) {
  res.send('OK');
  console.log(verifyToken);
}
