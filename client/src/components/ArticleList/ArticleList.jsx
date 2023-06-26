import React from 'react';
import './ArticleList.css';
import { Link } from 'react-router-dom';
import ArticleControls from '../../components/ArticleControls/ArticleControls';
import { formatArticleDate, formatString } from '../../helpers/generic';
import { useArticleContext } from '../../context/articleContext';
import UserProfileLink from '../UserProfileLink/UserProfileLink';
import Badge from '../Badge/Badge';

const ArticleList = ({ articleList }) => {
  const { articles, handleDeleteArticle, handleUpdateArticle } =
    useArticleContext();

  return (
    <div>
      {(articleList || articles).map((article) => {
        const { _id, title, createdAt, coverImage, content, user } = article;
        console.log(user);

        return (
          <div key={_id} className="article">
            <div className="article-cover-img-container">
              <img
                src={`${process.env.REACT_APP_BLOG_APP_BACKEND_URL}/${coverImage}`}
                alt="cover image"
              />
            </div>
            <div className="article-info">
              <h2 className="article-title">
                <Link
                  className="article-link"
                  to={{
                    pathname: `${global.BASE_ROUTE}/${formatString(title)}`,
                  }}
                  state={{
                    articleId: _id,
                  }}
                >
                  {title.length > 30 ? `${title.slice(0, 30)}...` : title}
                </Link>
              </h2>

              <p
                className="article-content"
                dangerouslySetInnerHTML={{
                  __html: `${
                    content.length > 130
                      ? `${content.slice(0, 130)}...`
                      : content
                  }`,
                }}
              />

              <p className="article-writtenBy">
                <UserProfileLink user={user}>
                  by <em>{user?.name}</em>
                </UserProfileLink>
                <Badge user={user} />
                <span className="dot"></span>
                <span className="article-date">
                  {formatArticleDate(createdAt)}
                </span>
              </p>

              <ArticleControls
                article={article}
                handleDelete={handleDeleteArticle}
                handleUpdate={handleUpdateArticle}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ArticleList;
