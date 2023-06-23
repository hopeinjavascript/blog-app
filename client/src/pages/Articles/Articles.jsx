import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Articles.css';
import Loader from '../../components/Loader/Loader';
import ArticleControls from '../../components/ArticleControls/ArticleControls';
import { formatArticleDate, formatString } from '../../helpers/generic';
import { useArticleContext } from '../../context/articleContext';
import { IoAdd } from 'react-icons/io5';

function Articles() {
  const { loading, articles, handleDeleteArticle, handleUpdateArticle } =
    useArticleContext();

  // for getting fresh data from backend in desc order
  // useEffect(() => {
  //   fetchArticles();
  //   return () => {};
  // }, []);

  if (loading)
    return (
      <section className="page-section">
        <Loader height="100px" width="100px" />
      </section>
    );

  return (
    <section className="page-section page-section-m">
      <div className="articles-wrapper">
        <header>
          <h1 className="page-header">articles</h1>
          <Link to={`${global.BASE_ROUTE}/articles/add`}>
            <button type="button">
              <IoAdd className="btn-icon-left" />
              Create Post
            </button>
          </Link>
        </header>
        <hr />
        {articles.map((article) => {
          const { _id, title, createdAt, coverImage, content, user } = article;
          console.log({ _id, title, createdAt, coverImage, content, user });
          debugger;
          return (
            <div key={_id} className="article">
              <div className="article-cover-img-container">
                <img src={coverImage} alt="cover image" />
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
                    {title.length > 35 ? `${title.slice(0, 35)}...` : title}
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
                ></p>

                <p className="article-writtenBy">
                  <Link to={`/users/${user?.username}`}>
                    by <em>{user?.name}</em>
                  </Link>
                  {user?.isAdmin && <span className="admin-badge ">Admin</span>}
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
          // }
        })}
      </div>
    </section>
  );
}

export default Articles;
