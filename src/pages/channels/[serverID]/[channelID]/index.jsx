import { usePresenceChannel } from '@harelpls/use-pusher';
import Channels from 'components/Channels/';
import ChannelSideBar from 'components/ChannelSideBar';
import Main from 'components/Main/Main';
import Messages from 'components/Messages/Messages';
import PeopleSideBar from 'components/PeopleSideBar/PeopleSideBar';
import Sidebar from 'components/Sidebar';
import withAuth from 'hoc/withAuth';
import Layout from 'layouts';
import Head from 'next/head';

const channelIDPage = ({ serverID, channelID }) => {
  const channelName = `presence-channel-${channelID}`;
  const { channel, members, myID } = usePresenceChannel(channelName);

  return (
    <div>
      <Head>
        <title>Channel | Disscord</title>
      </Head>

      <Layout>
        <Sidebar>
          <Sidebar.ChannelSideBar>
            <ChannelSideBar>
              <Channels serverID={serverID} channelID={channelID} />
            </ChannelSideBar>
          </Sidebar.ChannelSideBar>
        </Sidebar>
        <div className="bg-gray-600 w-full h-screen overflow-hidden overflow-y-auto scrollbar-thin relative">
          <Main>
            <Messages channelID={channelID} presenceChannel={channel} />
          </Main>
        </div>
        <PeopleSideBar
          members={members}
          myID={myID}
          serverID={serverID}
          channelID={channelID}
        />
      </Layout>
    </div>
  );
};

export default withAuth(channelIDPage);

export async function getServerSideProps(ctx) {
  const { serverID, channelID } = ctx.params;

  return {
    props: {
      serverID,
      channelID,
    },
  };
}
