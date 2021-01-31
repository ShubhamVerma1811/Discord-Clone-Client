import React from 'react';

const DropDown = ({ beforeHR, afterHR }) => {
  return (
    <div className="bg-green-300 absolute">
      {beforeHR.map((item) => (
        <p>{item.label}</p>
        /*
        import {item.iconName} '@material-ui/icons'
        */
        //  <item.iconName />
      ))}
      <hr />
      {afterHR.map((item) => (
        <p>{item.label}</p>
      ))}
    </div>
  );
};

export default DropDown;
