import React from 'react';
import { Link } from 'react-router-dom';
import './Articles.css';
import Loader from '../../components/Loader/Loader';
import { useArticleContext } from '../../context/articleContext';
import { IoAdd } from 'react-icons/io5';
import ArticleList from '../../components/ArticleList/ArticleList';

function Articles({ pageHeader, articleList }) {
  const { loading, articles } = useArticleContext();

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
    <section className="page-section page-section-p">
      <div className="articles-wrapper">
        <header>
          <h1 className="page-header">{pageHeader ?? 'articles'}</h1>
          <Link to={`${global.BASE_ROUTE}/articles/add`}>
            <button type="button" className="btn-primary">
              Create Post
              <IoAdd className="btn-icon-right" />
            </button>
          </Link>
        </header>
        <hr />
        {(articleList ?? articles).length ? (
          <ArticleList list={articleList ?? articles} />
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
    </section>
  );
}

export default Articles;
