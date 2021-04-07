import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getServerMembers } from 'services/handleServersData';

const PeopleSideBar = ({ serverID, members, myID }) => {
  const { data, isLoading } = useQuery(['getServerMembers', { serverID }], () =>
    getServerMembers(serverID)
  );
  const [currentlyOnlineMembers, setCurrentOnlineMembers] = useState([]);

  return (
    <div className={`bg-gray-700 h-screen relative`}>
      {Object.entries(members).map((info, id) => (
        <>
          <li className="list-none" key={id}>
            {info[1].username}
          </li>
        </>
      ))}
      <hr />
      {!isLoading &&
        data.map(({ user }) => {
          return (
            <li className="list-none" key={user.user_uid}>
              {user.username}
            </li>
          );
        })}
    </div>
  );
};

export default PeopleSideBar;
