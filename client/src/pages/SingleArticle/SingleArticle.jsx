import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SingleArticle.css';
import Loader from '../../components/Loader/Loader';
import { toast } from 'react-toastify';
import { fetchCall } from '../../helpers/fetchCall';
import ArticleControls from '../../components/ArticleControls/ArticleControls';
import { formatArticleDate } from '../../helpers/generic';
import SocialLinks from '../../components/SocialLinks/SocialLinks';
import { useArticleContext } from '../../context/articleContext';
import UserProfileLink from '../../components/UserProfileLink/UserProfileLink';
import Badge from '../../components/Badge/Badge';

const SingleArticle = () => {
  const location = useLocation();

  const {
    loading,
    article,
    fetchArticle,
    handleDeleteArticle,
    handleUpdateArticle,
  } = useArticleContext();

  useEffect(() => {
    fetchArticle(location?.state?.articleId);
    return () => {};
  }, []);

  if (loading)
    return (
      <section className="page-section">
        <Loader />
      </section>
    );

  const { _id, title, createdAt, content, coverImage, user } = article;

  return (
    <section className="page-section page-section-m fd-col">
      <article className="single-article">
        <header>
          <h1 className="single-article-title">{title}</h1>
          <div className="single-article-info">
            <img className="img" src="//unsplash.it/210/230" alt="" />
            <div>
              <p className="name">
                <UserProfileLink user={user} />
                <Badge user={user} />
              </p>
              <p className="article-date">{formatArticleDate(createdAt)}</p>
            </div>
          </div>

          {/* // TODO: change className */}
          <div className="some">
            <ArticleControls
              article={article}
              handleDelete={handleDeleteArticle}
              handleUpdate={handleUpdateArticle}
            />
          </div>
        </header>

        <div className="single-article-cover-img-container">
          <img
            src={`${process.env.REACT_APP_BLOG_APP_BACKEND_URL}/${coverImage}`}
            alt="cover image"
          />
        </div>

        <div className="ql-snow">
          <div
            className="single-article-content ql-editor"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        </div>
      </article>

      {/* <div className="comments-wrapper">
        <h1>Discussion(12)</h1>
      </div> */}
    </section>
  );
};

export default SingleArticle;
