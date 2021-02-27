import Sidebar from 'components/Sidebar';
import withAuth from 'hoc/withAuth';
import Layout from 'layouts';
import { useState } from 'react';

const Me = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Layout>
        <Sidebar>
          <Sidebar.ChannelSideBar>
            <h1>FRIENDs</h1>
          </Sidebar.ChannelSideBar>
        </Sidebar>
        <div className="bg-gray-600 w-full">
          <h1 onClick={() => setOpen(true)}>CONTENT </h1>
        </div>
      </Layout>
    </div>
  );
};

export default withAuth(Me);
