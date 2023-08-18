import React from 'react';
import cmp from './cmp.png';
import printer from './printer.png';
import monitor from './monitor.png';

const Card = ({ name, owner, position, model, code, date, category }) => {
  let iconSrc;
  switch(category){
    case 'computer':iconSrc=cmp;
    break;
    case 'printer':iconSrc=printer;
    break;
    case 'monitor':iconSrc=monitor;
    break;
    default:iconSrc='noICON';
    break;
  }

  return (
    <div className="card">
      <div className="card-icon"><img src={iconSrc} alt={category}></img></div>
      <div className="card-info">
        <p>設備名稱:</p>
        <p>{name}</p>
        <p>擁有人:</p>
        <p>{owner}</p>
        <p>位置: {position}</p>
        <p>型號: {model}</p>
      </div>
      <div className='tooltiptext'>
      <span>財產編號:</span>
      <br/>
      <span>{code}</span>
      <br/>
      <span>購買日期:</span>
      <br/>
      <span>{date}</span>
      </div>
    </div>
  );
};

export default Card;
