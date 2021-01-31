// import { useChannel, useEvent, useTrigger } from '@harelpls/use-pusher';
import Channels from 'components/Channels/';
import ChannelSideBar from 'components/ChannelSideBar';
import Main from 'components/Main/Main';
import Messages from 'components/Messages/Messages';
import Sidebar from 'components/Sidebar';
import Layout from 'layouts';

const channelIDPage = ({ serverID, channelID }) => {
  return (
    <div>
      <Layout>
        <Sidebar>
          <Sidebar.ChannelSideBar>
            <ChannelSideBar>
              <Channels serverID={serverID} channelID={channelID} />
            </ChannelSideBar>
          </Sidebar.ChannelSideBar>
        </Sidebar>
        <div className="bg-gray-600 w-full">
          <Main>
            <h1>MAIN CONTENT</h1>
            <h1>Messages for channelID : {channelID}</h1>
            <Messages channelID={channelID} />
          </Main>
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
