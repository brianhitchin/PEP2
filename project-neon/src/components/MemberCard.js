// MemberCard.js

import React from 'react';

const MemberCard = ({ member }) => {
  const {
    assists,
    faults,
    jerseyNumber,
    name,
    playtime,
    scores,
    teamId,
  } = member;

  return (
    <div className="card mb-3">
      <div className="card-header">
        <h5>{name}</h5>
      </div>
      <div className="card-body">
        <p>Jersey Number: {jerseyNumber}</p>
        <p>Assists: {assists}</p>
        <p>Faults: {faults}</p>
        <p>Playtime: {playtime}</p>
        <p>Scores: {scores}</p>
        <p>Team ID: {teamId}</p>
      </div>
    </div>
  );
};

export default MemberCard;
