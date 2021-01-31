import Link from 'next/link';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { Modal } from 'react-responsive-modal';
import { createChannel } from 'services/handleChannelsData';
import { getServerChannels } from 'services/handleServersData';

const Channels = ({ serverID, channelID }) => {
  const user = useSelector((state) => state.user);
  const [channelModal, setChannelModal] = useState(false);
  const [channelName, setChannelName] = useState('');

  const { data, isLoading } = useQuery(
    ['getServerChannels', { serverID }],
    () => getServerChannels(serverID)
  );

  const mutation = useMutation(async (newChannel) => {
    await createChannel(newChannel);
  });

  const handleCreateChannel = async (e) => {
    e.preventDefault();
    mutation.mutate({
      name: channelName,
      userID: user.user_uid,
      serverID,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  };

  return (
    <div>
      <div>
        <Modal
          open={channelModal}
          onClose={() => setChannelModal(false)}
          closeOnEsc={true}
          center>
          <form onSubmit={handleCreateChannel}>
            <input
              value={channelName}
              placeholder="Channel Name"
              onChange={(e) => setChannelName(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        </Modal>
      </div>

      <div>
        <button onClick={() => setChannelModal(!channelModal)}>
          Add Channel
        </button>
      </div>

      <div>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          data.channels.map((channel) => {
            return (
              <Link
                key={channel.channel_uid}
                href={`/channels/${serverID}/${channel.channel_uid}`}>
                <div
                  className={`channel py-2 px-1 cursor-pointer rounded-md my-1 mx-1

                  ${
                    channelID == channel.channel_uid
                      ? 'bg-gray-600 text-white'
                      : 'bg-gray-700'
                  }

                  `}>
                  <p key={channel.channel_uid}>{channel.name}</p>
                </div>
              </Link>
            );
          })
        )}
      </div>
      <style jsx>
        {`
          .channel:hover {
            background: rgba(107, 114, 128, 0.4);
          }
        `}
      </style>
    </div>
  );
};

export default Channels;
