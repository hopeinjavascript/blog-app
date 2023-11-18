import React from 'react';
import './Nav.css';
import { Link, useNavigate } from 'react-router-dom';
import { removeLocalStorage } from '../../helpers/generic';
import { useUserContext } from '../../context/userContext';
import UserProfileLink from '../UserProfileLink/UserProfileLink';

const Nav = () => {
  const { loggedInUser, setLoggedInUser } = useUserContext();

  const navigate = useNavigate();

  const handleLogout = () => {
    removeLocalStorage('token');
    setLoggedInUser(null);
    navigate('/');
  };

  // TODO: fix HTML & fix/organize CSS classes
  return (
    <nav>
      <Link to="/" className="logo">
        {/* <img src="//unsplash.it/35" alt="logo" /> */}
        <strong>
          <em>Blog App</em>
        </strong>
      </Link>

      {loggedInUser ? (
        <div className="home-wrapper">
          <Link to={`${global.BASE_ROUTE}/articles`}>Articles</Link>
          <Link to={`/users`}>Users</Link>
          <UserProfileLink user={loggedInUser}>
            <small>
              <strong>{loggedInUser.username}</strong>
            </small>
          </UserProfileLink>
          <button type="button" className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="home-wrapper">
          <Link to={`${global.BASE_ROUTE}/articles`}>Articles</Link>
          <Link to="/login">
            <button type="button">Login</button>
          </Link>
          <Link to="/signup">
            <button type="button">Signup</button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
