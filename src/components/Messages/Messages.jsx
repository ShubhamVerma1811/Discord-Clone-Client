import { useEvent, useTrigger } from '@harelpls/use-pusher';
import Avatar from 'components/Avatar/Avatar';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { getChannelMessages } from 'services/handleChannelsData';
import { createMessage } from 'services/handleMessagesData';

const Messages = ({ channelID, presenceChannel }) => {
  const [msg, setMsg] = useState('');
  const [msgs, setMsgs] = useState([]);
  const user = useSelector((state) => state.user);

  const { data, isLoading } = useQuery(
    ['getChannelMessages', { channelID }],
    () => getChannelMessages(channelID)
  );

  const mutation = useMutation(async (newMsg) => {
    await createMessage(newMsg);
  });

  useEvent(presenceChannel, 'send-msg', (msgData) => {
    setMsgs((prev) => [...prev, { ...msgData, username: msgData.authorName }]);
  });
  const trigger = useTrigger(presenceChannel?.name);

  useEffect(() => {
    setMsgs([]);
  }, [channelID]);

  useEffect(() => {
    if (data?.messages) setMsgs((prev) => [...prev, ...data?.messages]);
  }, [channelID, isLoading]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const msgData = {
      context: msg,
      channelID,
      authorID: user.user_uid,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    mutation.mutate(msgData);
    trigger('send-msg', { ...msgData, authorName: user.username });
    setMsg('');
  };

  return (
    <div className="flex flex-col">
      <div>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          msgs.map((message) => (
            <div key={message.message_uid}>
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
                      <p>{moment(message.created_at).format('lll')}</p>
                    </div>
                  </div>
                  <div>{message.context}</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div
        className="fixed bottom-0 overflow-hidden bg-gray-700 px-2 py-2"
        style={{ width: 'inherit' }}>
        <form onSubmit={handleSendMessage}>
          <input
            className="py-2 text-white w-full bg-gray-700 border-transparent border-2 focus-within:border-blue-500"
            type="text"
            value={msg}
            placeholder="Send Message"
            required
            onChange={(e) => setMsg(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};

export default Messages;
