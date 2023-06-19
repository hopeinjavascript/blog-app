import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../context/userContext';
import { removeLocalStorage } from '../../helpers/generic';

const Home = () => {
  const { loggedInUser, setLoggedInUser } = useUserContext();

  const handleLogout = () => {
    removeLocalStorage('token');
    setLoggedInUser(null);
  };

  return (
    <div className="page-section">
      {loggedInUser ? (
        <div className="home-wrapper welcome">
          <h1>{`Welcome home, ${loggedInUser.email}`}</h1>
          <button type="button" className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="home-wrapper">
          <Link to="/login">
            <button type="button">Login</button>
          </Link>
          <Link to="/signup">
            <button type="button">Signup</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
