import React from 'react';
import './Nav.css';
import { Link, useNavigate } from 'react-router-dom';
import { removeLocalStorage } from '../../helpers/generic';
import { useUserContext } from '../../context/userContext';
import UserProfileLink from '../UserProfileLink/UserProfileLink';
import { useArticleContext } from '../../context/articleContext';
import { CiSearch } from 'react-icons/ci';

//preserving full list
let ARTICLES = [];
const Nav = () => {
  const { loggedInUser, setLoggedInUser } = useUserContext();
  const { articles, dispatch } = useArticleContext();
  ARTICLES = articles;

  const navigate = useNavigate();

  const handleLogout = () => {
    removeLocalStorage('token');
    setLoggedInUser(null);
    navigate('/');
  };

  //debounce
  let timer;
  const handleSearch = (e) => {
    const query = e.target.value;

    if (!query.trim()) {
      dispatch({
        type: 'FETCH_ARTICLES',
        payload: { articles: ARTICLES },
      });
      return;
    }

    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      const searchedArticles = articles.filter((article) =>
        article.title.toLowerCase().includes(query)
      );
      console.log(searchedArticles);
      // setArticles(searchedArticles);
      dispatch({
        type: 'FETCH_ARTICLES',
        payload: { articles: searchedArticles },
      });
    }, 500);
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

      <div className="home-wrapper">
        <div className="search-bar">
          <CiSearch />
          <input
            type="search"
            name="search"
            id="search"
            // className="user-input"
            // placeholder='Search from {count > 100 ? count : "various"} articles...'
            placeholder="Search from various articles..."
            onChange={handleSearch}
          />
        </div>
        {loggedInUser ? (
          <>
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
          </>
        ) : (
          <>
            <Link to={`${global.BASE_ROUTE}/articles`}>Articles</Link>
            <Link to="/login">
              <button type="button">Login</button>
            </Link>
            <Link to="/signup">
              <button type="button">Signup</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
