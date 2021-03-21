import React from 'react';

const PeopleSideBar = ({ children, members }) => {
  return (
    <div className={`bg-gray-700 w-60 h-screen relative`}>
      {Object.entries(members)
        // map them to a list
        .map((
          info,
          id // info 1st parameter, id 2nd
        ) => (
          <>
            <li key={id}>{info[1].username}</li>
          </>
        ))}
    </div>
  );
};

export default PeopleSideBar;
