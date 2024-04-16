import React from 'react';

const Genre = ({ text }) => {
  return <span className="Genre">{text}</span>;
};

export default React.memo(Genre);
