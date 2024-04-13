import React from 'react';

const TitleBox = ({ content }) => {
  return <div className="TitleBox">{content}</div>;
};

export default React.memo(TitleBox);
