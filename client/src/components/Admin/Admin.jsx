import React from 'react';

const Admin = ({ adminUsers, username }) => {
  return (
    <>
      {adminUsers.map((adminUser, index) => {
        if (adminUser.username === username) {
          return (
            <span key={index} className="admin-badge ">
              Admin
            </span>
          );
        }
        return null;
      })}
    </>
  );
};

export default Admin;
