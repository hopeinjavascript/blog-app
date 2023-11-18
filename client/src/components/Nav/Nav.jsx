import React, { useState, useEffect } from 'react';
import './Nav.css';
import { socket } from '../../socket';
import { Link, useNavigate } from 'react-router-dom';
import { removeLocalStorage } from '../../helpers/generic';
import { useUserContext } from '../../context/userContext';
import { IoNotificationsOutline } from 'react-icons/io5';
import UserProfileLink from '../UserProfileLink/UserProfileLink';

const Nav = () => {
  const { loggedInUser, setLoggedInUser } = useUserContext();

  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(false);
  const [seeNotifications, setSeeNotifications] = useState(false);

  useEffect(() => {
    const onLike = (data) => {
      console.log(`like event - `, data);
      setNotifications([data, ...notifications]);
      // to trigger animation
      setNotificationCount(true);
    };

    function onNotify(data) {
      console.log({ onNotifyNotifications: data });
      setNotifications(data.notifications);
    }

    socket.on('like', onLike);
    socket.on('notify', onNotify);

    setTimeout(() => setNotificationCount(false), 1000);

    return () => {
      socket.off('like', onLike);
      socket.off('notify', onNotify);
    };
  }, [notifications, notifications.length]);

  const handleLogout = () => {
    removeLocalStorage('token');
    setLoggedInUser(null);
    navigate('/');
  };

  const viewNotifications = () => {
    setSeeNotifications(!seeNotifications);
  };
  const hideNotifications = () => {
    setSeeNotifications(!seeNotifications);
  };

  const handleMarkAsRead = () => {};

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
          <div className="bell" onClick={viewNotifications}>
            <IoNotificationsOutline
              className={notificationCount ? 'ani' : ''}
            />
            {notifications.length ? (
              <>
                <span className="notification">{notifications.length}</span>
                <span className="pulser"></span>
              </>
            ) : null}
          </div>
          {seeNotifications && (
            <div className="notifications">
              {notifications.map((notification) => {
                const { socketId, isRead, msg } = notification;
                return (
                  <p
                    key={socketId}
                    className={`${!isRead ? 'notification-not-read' : ''}`}
                    onClick={() => handleMarkAsRead()}>
                    {msg}
                  </p>
                );
              })}
            </div>
          )}
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
