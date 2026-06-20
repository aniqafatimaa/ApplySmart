import React from 'react';

const ApplicationCard = ({ application }) => {
  return (
    <div className="application-card">
      <h4>{application?.title}</h4>
      <p>{application?.description}</p>
      {/* Card content */}
    </div>
  );
};

export default ApplicationCard;
