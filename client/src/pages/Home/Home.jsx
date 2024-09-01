import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../context/userContext';
import UserProfileLink from '../../components/UserProfileLink/UserProfileLink';
import { CiLocationOn } from 'react-icons/ci';
import { MdOutlineStart } from 'react-icons/md';

const Home = () => {
  const { loggedInUser } = useUserContext();

  return (
    <div className="home-wrapper">
      <div className="home-page-section tag">
        <div>
          <h1 className="tagline">Be one of us!</h1>
          <h1 className="sub-tagline">We are techies</h1>
          <div className="location">
            <CiLocationOn />
            <p className="location-name">Mumbai, India</p>
          </div>
        </div>

        <div className="menu">
          {/* <label className="hamburger-menu" for="notification">
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </label>
          <input type="checkbox" name="check" id="notification" /> */}

          <div className="submenu">
            <Link to="/">Home</Link>
            <Link to={`${global.BASE_ROUTE}/articles`}>Articles</Link>
            <Link to="/users">Users</Link>
            <UserProfileLink user={loggedInUser}>
              <small>
                <strong>{loggedInUser?.username && 'you'}</strong>
              </small>
            </UserProfileLink>
          </div>
        </div>
      </div>

      <header className="home-page-section header">
        <img src="lamp.jpg" alt="lamp" />
        <blockquote className="intro">
          <p>
            Don't be a Guest, join the community of like minded people and be
            one of us.
            {/* <br />
            Share your knowledge with the world. */}
          </p>
          <button className="btn btn-primary btn-icon-right">
            get started <MdOutlineStart />
          </button>
        </blockquote>
      </header>

      <hr className="hr-large" />

      {/* TODO: user cards can be transformed into profile cards */}
      <div className="home-page-section recently-joined-users">
        <p className="main-text right">Recently Joined</p>

        <div className="user-cards">
          <div className="user-card">
            <div className="user-img">
              <img src="//unsplash.it/60" alt="user" srcset="" />
            </div>
            <div className="user-info">
              <h3>
                <UserProfileLink
                  user={{ username: 'akkis1993', name: 'Akshay Sood' }}
                />
              </h3>
              <p>Senior Full-stack Developer</p>
            </div>
          </div>
          <div className="user-card">
            <div className="user-img">
              <img src="//unsplash.it/60" alt="user" srcset="" />
            </div>
            <div className="user-info">
              <h3>
                <UserProfileLink
                  user={{ username: 'akkis1993', name: 'Akshay Sood' }}
                />
              </h3>
              <p>Senior Full-stack Developer</p>
            </div>
          </div>
          <div className="user-card">
            <div className="user-img">
              <img src="//unsplash.it/70" alt="user" srcset="" />
            </div>
            <div className="user-info">
              <h3>
                <UserProfileLink
                  user={{ username: 'akkis1993', name: 'Akshay Sood' }}
                />
              </h3>
              <p>Senior Full-stack Developer</p>
            </div>
          </div>
          <div className="user-card">
            <div className="user-img">
              <img src="//unsplash.it/55" alt="user" srcset="" />
            </div>
            <div className="user-info">
              <h3>
                <UserProfileLink
                  user={{ username: 'akkis1993', name: 'Akshay Sood' }}
                />
              </h3>
              <p>Senior Full-stack Developer</p>
            </div>
          </div>
          <div className="user-card">
            <div className="user-img">
              <img src="//unsplash.it/50" alt="user" srcset="" />
            </div>
            <div className="user-info">
              <h3>
                <UserProfileLink
                  user={{ username: 'akkis1993', name: 'Akshay Sood' }}
                />
              </h3>
              <p>Senior Full-stack Developer</p>
            </div>
          </div>
        </div>
      </div>

      <hr className="hr-large" />

      <div className="home-page-section popular-articles">
        <p className="main-text left">Popular Articles</p>
        <div className="popular-articles-cards">
          <div className="popular-article-card">
            <h1 className="title">Lorem ipsum dolor sit amet</h1>
            <p className="description">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab
              voluptate distinctio molestias impedit quo fugit.
            </p>
            <div className="single-article-info">
              <img className="img" src="//unsplash.it/210/230" alt="" />
              <div>
                <p>
                  <UserProfileLink
                    user={{ username: 'johndoe', name: 'John Doe' }}
                  />
                </p>
                <p className="article-date">03 Dec, 2023</p>
              </div>
            </div>
          </div>
          <div className="popular-article-card">
            <h1 className="title">Lorem ipsum dolor sit amet</h1>
            <p className="description">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab
              voluptate distinctio molestias impedit quo fugit.
            </p>
            <div className="single-article-info">
              <img className="img" src="//unsplash.it/210/231" alt="" />
              <div>
                <p className="name">
                  <UserProfileLink
                    user={{ username: 'johndoe', name: 'John Doe' }}
                  />
                </p>
                <p className="article-date">03 Dec, 2023</p>
              </div>
            </div>
          </div>
          <div className="popular-article-card">
            <h1 className="title">Lorem ipsum dolor sit amet</h1>
            <p className="description">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab
              voluptate distinctio molestias impedit quo fugit.
            </p>
            <div className="single-article-info">
              <img className="img" src="//unsplash.it/210/232" alt="" />
              <div>
                <p className="name">
                  <UserProfileLink
                    user={{ username: 'johndoe', name: 'John Doe' }}
                  />
                </p>
                <p className="article-date">03 Dec, 2023</p>
              </div>
            </div>
          </div>
          <div className="popular-article-card">
            <h1 className="title">Lorem ipsum dolor sit amet</h1>
            <p className="description">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab
              voluptate distinctio molestias impedit quo fugit.
            </p>
            <div className="single-article-info">
              <img className="img" src="//unsplash.it/210/233" alt="" />
              <div>
                <p className="name">
                  <UserProfileLink
                    user={{ username: 'johndoe', name: 'John Doe' }}
                  />
                </p>
                <p className="article-date">03 Dec, 2023</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="hr-large" />

      <div className="home-page-section newsletter">
        <h1>Subscribe to our newsletter</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <form className="newsletter-form">
          <div className="user-input">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email address"
            />
          </div>
          <button type="submit" className="btn-primary">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
