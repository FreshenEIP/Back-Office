import React from 'react';

const SidebardItem = (props) => {
  const active = props.active ? 'active' : '';

  return (
    <div className={'sidebar__item'}>
      <div className={`sidebar__item-inner ${active}`}>
        {props.icon}
        <span>{props.title}</span>
      </div>
    </div>
  );
};

export default SidebardItem;
