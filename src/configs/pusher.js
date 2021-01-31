import getUserToken from 'services/getUserToken';

export const pusherConfig = {
  clientKey: process.env.NEXT_PUBLIC_PUSHER_KEY,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
  authEndpoint: '/api/pusher/auth',
  triggerEndpoint: '/api/pusher',
  auth: {
    params: {
      user_id: getUserToken(),
    },
  },
};
export default pusherConfig;
