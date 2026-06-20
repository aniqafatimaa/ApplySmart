import React from 'react';

const StatusBadge = ({ status }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'pending':
        return 'badge-pending';
      case 'accepted':
        return 'badge-accepted';
      case 'rejected':
        return 'badge-rejected';
      default:
        return '';
    }
  };

  return <span className={`badge ${getStatusClass(status)}`}>{status}</span>;
};

export default StatusBadge;
