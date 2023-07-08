import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './SingleArticle.css';
import Loader from '../../components/Loader/Loader';
import ArticleControls from '../../components/ArticleControls/ArticleControls';
import { formatArticleDate } from '../../helpers/generic';
import { useArticleContext } from '../../context/articleContext';
import UserProfileLink from '../../components/UserProfileLink/UserProfileLink';
import Badge from '../../components/Badge/Badge';
import Comments from '../../components/Comments/Comments';
import AddCommentOrReply from '../../components/AddCommentOrReply/AddCommentOrReply';
import { useCommentContext } from '../../context/commentContext';

const SingleArticle = () => {
  const location = useLocation();
  console.log('[SingleArticle]', location);

  const { handleAddComment, fetchCommentsByArticle } = useCommentContext();

  const {
    loading,
    article,
    fetchArticle,
    handleDeleteArticle,
    handleUpdateArticle,
  } = useArticleContext();

  const { comments } = useCommentContext();

  const { title, createdAt, content, coverImage, user } = article;

  useEffect(() => {
    fetchArticle(location?.state?.articleId);
    fetchCommentsByArticle(location?.state?.articleId);
    return () => {};
  }, []);

  if (loading)
    return (
      <section className="page-section">
        <Loader />
      </section>
    );

  const getChildComments = (parentCommentId) =>
    comments.filter((comment) => comment.parentId === parentCommentId);

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

      <div className="comments-wrapper">
        <h2 className="heading">Discussion</h2>

        <div className="comment-box">
          <AddCommentOrReply
            handler={(commentContent) =>
              handleAddComment({
                articleId: location?.state?.articleId, // to concatenate in the API url
                ...commentContent,
              })
            }
          />
        </div>

        <Comments
          comments={comments?.filter((comment) => !comment.parentId)}
          getChildComments={getChildComments}
        />
      </div>
    </section>
  );
};

export default SingleArticle;
