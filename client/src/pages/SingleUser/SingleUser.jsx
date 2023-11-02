import React, { useEffect } from 'react';
import './SingleUser.css';
import { Link, useLocation } from 'react-router-dom';
import { useArticleContext } from '../../context/articleContext';
import { useUserContext } from '../../context/userContext';
import { FaRegComment } from 'react-icons/fa';
import { SlLike, SlNote } from 'react-icons/sl';
import { IoBookmarkOutline } from 'react-icons/io5';

const SingleUser = () => {
  // const [user, setUser] = useState({});

  const { user, fetchUser } = useUserContext();
  const {
    fetchArticlesWrittenByUser,
    fetchArticlesSavedByUser,
    articlesWrittenByUser,
    articlesSavedByUser,
  } = useArticleContext();

  const location = useLocation();
  const userId = location?.state?.userId;

  useEffect(() => {
    fetchUser(userId);
    // TODO: get count of all the stats in one query from backend. This is very inefficient!
    fetchArticlesWrittenByUser(userId);
    fetchArticlesSavedByUser(userId);
    return () => {};
  }, [userId]);

  return (
    <section className="page-section-m">
      <div className="single-user-wrapper">
        <div className="banner">
          <img
            // src="http://localhost:5000/user-profile-picture/Dragon-Ball-Z-banner.jpg"
            src="//unsplash.it/1200"
            alt="banner"
            srcSet=""
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
              <div className="followers">
                <h2>{user?.followers?.length ?? 0}</h2>
                <span>Followers</span>
              </div>
              <div className="following">
                <h2>{user?.following?.length ?? 0}</h2>
                <span>Following</span>
              </div>
              <div className="articles-written">
                <h2>{articlesWrittenByUser.length}</h2>
                <span>Articles</span>
              </div>
            </div>
            <button type="button" className="btn-follow">
              {/* TODO: check for follow/unfollow */}
              Follow
            </button>
          </div>
          <div className="user-stats">
            <div>
              <div className="user-stats-icon">
                <SlNote />
              </div>
              <div className="">
                <Link
                  to={`${global.BASE_ROUTE}/users/${userId}/articles/written`}
                  state={{ userId }}
                >
                  <p className="count">{articlesWrittenByUser.length}</p>
                </Link>
                <p className="label">Written</p>
              </div>
            </div>
            <div>
              <div className="user-stats-icon">
                <IoBookmarkOutline />
              </div>
              <div className="">
                <Link
                  to={`${global.BASE_ROUTE}/users/${userId}/articles/saved`}
                  state={{ userId }}
                >
                  <p className="count">{articlesSavedByUser.length}</p>
                </Link>
                <p className="label">Saved</p>
              </div>
            </div>
            <div>
              <div className="user-stats-icon">
                <FaRegComment />
              </div>
              <div>
                <Link to="">
                  <p className="count">56</p>
                </Link>
                <p className="label">comments</p>
              </div>
            </div>
            <div>
              <div className="user-stats-icon">
                <SlLike />
              </div>
              <div>
                <Link to="">
                  <p className="count">193</p>
                </Link>
                <p className="label">likes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleUser;
