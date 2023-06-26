import React from 'react';
import { Link } from 'react-router-dom';

const UserProfileLink = ({ user, children }) => {
  return (
    <Link to={`/users/${user?.username}`} state={{ userId: user?._id }}>
      {children ? children : user?.name}
    </Link>
  );
};

export default UserProfileLink;
