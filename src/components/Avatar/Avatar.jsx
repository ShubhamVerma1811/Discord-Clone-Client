import React from 'react';

const Avatar = ({ src, alt }) => {
  return (
    <div>
      <img className="w-full h-full object-cover" src={src} alt={alt} />
    </div>
  );
};

export default Avatar;
