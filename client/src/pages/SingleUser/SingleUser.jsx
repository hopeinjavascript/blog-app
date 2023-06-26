import React, { useEffect, useState } from 'react';
import './SingleUser.css';
import { Link, useLocation } from 'react-router-dom';
import { fetchCall } from '../../helpers/fetchCall';
import { toast } from 'react-toastify';
import ArticleList from '../../components/ArticleList/ArticleList';

const SingleUser = () => {
  const [user, setUser] = useState({});
  const [articlesWrittenByUser, setArticlesWrittenByUser] = useState([]);
  const [articlesSavedByUser, setArticlesSavedByUser] = useState([]);
  const location = useLocation();

  async function fetchUser() {
    const resp = await fetchCall(
      `${process.env.REACT_APP_BLOG_APP_BACKEND_URL}/users/${location?.state?.userId}`
    );

    if (!resp?.success) {
      toast(`${resp?.message}`, { type: 'error' });
    } else {
      console.log(resp.data);
      setUser(resp.data);
    }
  }

  async function fetchArticlesWrittenByUser() {
    const resp = await fetchCall(
      `${process.env.REACT_APP_BLOG_APP_BACKEND_URL}/users/${location?.state?.userId}/articles`
    );

    if (!resp?.success) {
      toast(`${resp?.message}`, { type: 'error' });
    } else {
      console.log(resp.data);
      setArticlesWrittenByUser(resp.data);
    }
  }

  async function fetchArticlesSavedByUser() {
    const resp = await fetchCall(
      `${process.env.REACT_APP_BLOG_APP_BACKEND_URL}/users/${location?.state?.userId}/articles/saved`
    );

    if (!resp?.success) {
      toast(`${resp?.message}`, { type: 'error' });
    } else {
      console.log(resp.data);
      setArticlesSavedByUser(resp.data);
    }
  }

  useEffect(() => {
    fetchUser();
    fetchArticlesWrittenByUser();
    // fetchArticlesSavedByUser(); // yet to write the api
    return () => {};
  }, [location?.state?.userId]);

  return (
    <section className="page-section-m">
      <div className="single-user-wrapper">
        <div className="banner">
          <img
            // src="http://localhost:5000/user-profile-picture/Dragon-Ball-Z-banner.jpg"
            src="//unsplash.it/1200"
            alt="banner"
            srcset=""
          />
        </div>
        <div className="user-profile">
          <div className="personal-info">
            <div className="profile-picture">
              {/* <img src={user.profilePicture} alt="profile picture" /> */}
              <img
                src="http://localhost:5000/user-profile-picture/Dragon-Ball-Z.jpeg"
                alt="profile picture"
              />
            </div>
            <h2 className="name">{user.name}</h2>
            <p className="profile">Senior Full Stack Developer</p>
            <div className="follow-list">
              <p className="followers">
                <h2>{user?.followers?.length ?? 0}</h2>
                <span>Followers</span>
              </p>
              <p className="following">
                <h2>{user?.following?.length ?? 0}</h2>
                <span>Following</span>
              </p>
              <p className="articles-written">
                <h2>{articlesWrittenByUser.length}</h2>
                <span>Articles</span>
              </p>
            </div>
            <button type="button" className="btn-follow">
              {/* TODO: check for follow/unfollow */}
              Follow
            </button>
          </div>
          <div className="blog-list-container">
            <div className="created-blog">
              <h1 className="heading">Your blog</h1>
              <div className="blog-list">
                {articlesWrittenByUser.length ? (
                  <ArticleList articleList={articlesWrittenByUser} />
                ) : (
                  <>
                    <p>
                      You have not written any article.{' '}
                      <Link
                        to={`${global.BASE_ROUTE}/articles/add`}
                        className="cta-link"
                      >
                        Write.
                      </Link>
                    </p>
                  </>
                )}
              </div>
            </div>
            <hr />
            <div className="saved-blog">
              <h1 className="heading">Your saved blog</h1>
              <div className="blog-list">
                {articlesSavedByUser.length ? (
                  <ArticleList articleList={articlesSavedByUser} />
                ) : (
                  <>
                    <p>
                      You don't have any saved articles.{' '}
                      <Link
                        to={`${global.BASE_ROUTE}/articles`}
                        className="cta-link"
                      >
                        Explore.
                      </Link>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleUser;
