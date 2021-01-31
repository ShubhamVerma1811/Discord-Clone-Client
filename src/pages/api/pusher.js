import Pusher from 'pusher';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
});

export default async function handler(req, res) {
  const { channelName, eventName, data } = JSON.parse(req.body);

  pusher.trigger(channelName, eventName, data);
  res.status(200).end();
}
