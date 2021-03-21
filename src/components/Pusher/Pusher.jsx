import { PusherProvider } from '@harelpls/use-pusher';
import { useSelector } from 'react-redux';

const Pusher = ({ children }) => {
  const user = useSelector((state) => state.user);

  const pusherConfig = {
    clientKey: process.env.NEXT_PUBLIC_PUSHER_KEY,
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    authEndpoint: '/api/pusher/auth',
    triggerEndpoint: '/api/pusher',
    auth: {
      params: {
        user_id: user.accessToken,
        user_info: JSON.stringify({
          username: user.username,
          email: user.email,
          profile_id: user.profile_picture,
        }),
      },
    },
  };

  return Object.keys(user).length ? (
    <PusherProvider {...pusherConfig}>{children}</PusherProvider>
  ) : (
    <div>{children}</div>
  );
};

export default Pusher;
