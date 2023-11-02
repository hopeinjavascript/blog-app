import React, { useEffect } from 'react';
import ArticleList from '../../components/ArticleList/ArticleList';
import { useLocation } from 'react-router-dom';
import { useArticleContext } from '../../context/articleContext';
import Articles from '../Articles/Articles';

const SavedArticleList = () => {
  const { articlesSavedByUser, fetchArticlesSavedByUser } = useArticleContext();

  const location = useLocation();
  const userId = location?.state?.userId;

  useEffect(() => {
    fetchArticlesSavedByUser(userId);
    return () => {};
  }, [userId]);

  return (
    <Articles pageHeader="Your Saved Blogs" articleList={articlesSavedByUser} />
  );
};

export default SavedArticleList;
