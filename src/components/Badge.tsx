import React from 'react';

const Badge = (props) => {
  return <span className={`badge ${props.type}`}>{props.content}</span>;
};

export default Badge;
