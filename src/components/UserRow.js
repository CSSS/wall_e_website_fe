import React from 'react';

import '../stylesheets/UserRow.css';

function UserRow(props) {
  const {
    position,
    name,
    avatar,
    points,
    levelNumber,
    messageCount,
    levelUpSpecificPoints,
    pointsNeededToLevelUp
  } = props.user;

  return (
    <div className={`userRow ${position%2 === 0 ? '' : 'alt'}`}>
      <div className="left">
        <h1 className="position">#<b>{position}</b></h1>
        <img src={avatar} alt={name} />
        <h1 className="name">{name}</h1>
        <h1 className="levelNumber">Level {levelNumber}</h1>
      </div>
      <div className="right">
        <div className="levelUpBar">
          <div className="levelUpBarFilled" style={{ width: `${Math.round(100 * levelUpSpecificPoints / pointsNeededToLevelUp)}%` }}></div>
          <h1 className="stats">
            {messageCount} message{messageCount === 1 ? '' : 's'},&nbsp;
            {points} point{points === 1 ? '' : 's'}
          </h1>
          <h1 className="levelUpBarText">{levelUpSpecificPoints} / {pointsNeededToLevelUp} points to next level.</h1>
        </div>
      </div>
    </div>
  );
}

export default UserRow;
