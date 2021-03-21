import jwt from 'jsonwebtoken';
import Pusher from 'pusher';

const pusher = new Pusher({
  app_id: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
});

export default async function pusherAuth(req, res) {
  if (req.method === 'POST') {
    const { channel_name, socket_id, user_id, user_info } = req.body;
    const { userID } = jwt.verify(user_id, process.env.ACCESS_TOKEN);
    const presenceData = {
      user_id: userID,
      user_info: JSON.parse(user_info),
    };

    const auth = pusher.authenticate(socket_id, channel_name, presenceData);
    res.status(200).send(auth);
  }
}
