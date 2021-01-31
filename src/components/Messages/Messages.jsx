import Avatar from 'components/Avatar/Avatar';
import moment from 'moment';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { getChannelMessages } from 'services/handleChannelsData';
import { createMessage } from 'services/handleMessagesData';

const Messages = ({ channelID }) => {
  const [msg, setMsg] = useState('');
  const user = useSelector((state) => state.user);
  const queryClient = useQueryClient();
  const mutation = useMutation(async (newMsg) => {
    const res = await createMessage(newMsg);
    queryClient.invalidateQueries('getChannelMessages');
  });

  const { data, isLoading } = useQuery(
    ['getChannelMessages', { channelID }],
    () => getChannelMessages(channelID)
  );

  const handleSendMessage = async (e) => {
    e.preventDefault();
    mutation.mutate({
      context: msg,
      channelID,
      authorID: user.user_uid,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    setMsg('');
  };

  return (
    <div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        data.messages.map((message) => (
          <div key={message.message_id}>
            <div className="flex">
              <div className="w-12 h-12 overflow-hidden rounded-full">
                <Avatar
                  src="https://firebasestorage.googleapis.com/v0/b/tweeter-45929.appspot.com/o/_MG_9752.JPG?alt=media&token=84363dfc-4111-4c5e-b569-0852da768639"
                  alt="profile_picture"
                />
              </div>
              <div>
                <div className="flex">
                  <div className="p-2">
                    <p>{message.username}</p>
                  </div>
                  <div className="p-2">
                    <p>{moment().calendar()}</p>
                  </div>
                </div>
                <div>{message.context}</div>
              </div>
            </div>
          </div>
        ))
      )}
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={msg}
          placeholder="Send Message"
          onChange={(e) => setMsg(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Messages;
