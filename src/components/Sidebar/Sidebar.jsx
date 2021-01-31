import { SwipeableDrawer } from '@material-ui/core';
import ChannelSideBar from 'components/ChannelSideBar';
import ServerSideBar from 'components/ServerSideBar';
import { useState } from 'react';

export const Sidebar = ({ children }) => {
  const [open, setOpen] = useState(true);

  return (
    <div>
      {/* <div className="hidden md:block">
        <SwipeableDrawer
          open={open}
          anchor="left"
          disableBackdropTransition={true}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}>
          <div className="flex">
            <ServerSideBar />
            {children}
          </div>
        </SwipeableDrawer>
      </div>
      <div className="md-block md:hidden"> */}
      <div className="flex">
        <ServerSideBar />
        {children}
      </div>
      {/* </div> */}
    </div>
  );
};

Sidebar.Servers = ServerSideBar;
Sidebar.ChannelSideBar = ChannelSideBar;
