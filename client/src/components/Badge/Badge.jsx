import React from 'react';
import './Badge.css';

const Badge = ({ user }) => {
  //   return (user?.isAdmin && <span className="admin-badge ">Admin</span>);

  return user?.roleId <= 2 && user?.roleId === 1 ? (
    <span className="badge owner-badge">Owner</span>
  ) : user?.roleId === 2 ? (
    <span className="badge admin-badge">Admin</span>
  ) : (
    <span className="badge guest-badge">Guest</span>
  );
};

export default Badge;
