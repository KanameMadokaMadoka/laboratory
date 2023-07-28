import React from 'react';

const Card = ({ icon, owner, location, model, code, date }) => {
  return (
    <div className="card">
      <div className="card-icon">{icon}</div>
      <div className="card-info">
        <p>擁有人: {owner}</p>
        <p>位置: {location}</p>
        <p>型號: {model}</p>
      </div>
      <div className='tooltiptext'>
      <span>財產編號:{code}</span>
      <br/>
      <span>購買日期:{date}</span>
      </div>
    </div>
  );
};

export default Card;
