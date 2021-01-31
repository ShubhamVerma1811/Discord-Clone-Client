// import { useChannel, useEvent, useTrigger } from '@harelpls/use-pusher';
import Channels from 'components/Channels/';
import ChannelSideBar from 'components/ChannelSideBar';
import Messages from 'components/Messages/Messages';
import Sidebar from 'components/Sidebar';
import Layout from 'layouts';
import { addDashes } from 'services/uuidFormat';
// import { useEffect, useState, useRef } from 'react';

const channelIDPage = ({ serverID, channelID }) => {
  // const [msg, setMsg] = useState('');
  // const messages = useRef({}).current;

  // const channel = useChannel(`presence-send-msg-${channelID}`);
  // useEvent(channel, 'send-msg', ({ channelID, msg }) => {
  //   if (!messages[channelID]) {
  //     messages[channelID] = [];
  //   }
  //   messages[channelID].push(msg);
  // });
  // const trigger = useTrigger(`presence-send-msg-${channelID}`);

  // console.log(messages);
  // useEffect(() => {}, [messages]);

  // y.slice(0,8)+"-"+y.slice(8,12)+"-"+y.slice(12,16)+"-"+y.slice(16,20)+"-"+y.slice(20)

  return (
    <div>
      <Layout>
        <Sidebar>
          <Sidebar.ChannelSideBar>
            <ChannelSideBar>
              <Channels serverID={serverID} channelID={addDashes(channelID)} />
            </ChannelSideBar>
          </Sidebar.ChannelSideBar>
        </Sidebar>
        <div className="bg-gray-600 w-full">
          <h1>MAIN CONTENT</h1>
          <h1>Messages for channelID : {channelID}</h1>
          <Messages channelID={channelID} />
          {/* {messages[channelID]?.map((msg, index) => (
            <h1 key={index}>{msg}</h1>
          ))}
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              trigger('send-msg', {
                channelID,
                msg,
              });
              setMsg('');
            }}>
            <input
              type="text"
              value={msg}
              placeholder="ENTER MSG"
              onChange={(e) => setMsg(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form> */}
        </div>
      </Layout>
    </div>
  );
};

export default channelIDPage;

export async function getServerSideProps(ctx) {
  const { serverID, channelID } = ctx.params;

  return {
    props: {
      serverID,
      channelID,
    },
  };
}
