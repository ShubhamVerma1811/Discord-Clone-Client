import Channels from 'components/Channels/Channels';
import UserDropDown from 'components/UserDropDown';

export const ChannelSideBar = ({ children }) => {
  return (
    <div className={`bg-gray-700 w-60 h-screen relative`}>
      {children}
      <div className="absolute bottom-0 w-full">
        <UserDropDown />
      </div>
    </div>
  );
};

ChannelSideBar.Channels = Channels;
