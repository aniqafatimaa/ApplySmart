import React from 'react';

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="stat-card">
      {icon && <div className="stat-icon">{icon}</div>}
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};

export default StatCard;
