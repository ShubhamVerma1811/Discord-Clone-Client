import Channels from 'components/Channels/Channels';
import ChannelSideBar from 'components/ChannelSideBar';
import Sidebar from 'components/Sidebar';
import withAuth from 'hoc/withAuth';
import Layout from 'layouts';

const serverIDPage = ({ serverID }) => {
  return (
    <div>
      <Layout>
        <Sidebar>
          <Sidebar.ChannelSideBar>
            <ChannelSideBar>
              <Channels serverID={serverID} />
            </ChannelSideBar>
          </Sidebar.ChannelSideBar>
        </Sidebar>
        <div className="bg-gray-600 w-full">
          <h1>MAIN CONTENT</h1>
        </div>
      </Layout>
    </div>
  );
};

export default withAuth(serverIDPage);

export async function getServerSideProps(ctx) {
  const { serverID } = ctx.params;

  return {
    props: {
      serverID,
    },
  };
}
