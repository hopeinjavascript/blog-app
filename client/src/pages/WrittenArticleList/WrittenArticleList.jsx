import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useArticleContext } from '../../context/articleContext';
import Articles from '../Articles/Articles';

const WrittenArticleList = () => {
  const { articlesWrittenByUser, fetchArticlesWrittenByUser } =
    useArticleContext();

  const location = useLocation();
  const userId = location?.state?.userId;

  useEffect(() => {
    fetchArticlesWrittenByUser(userId);
    return () => {};
  }, [userId]);

  return (
    <Articles pageHeader="Your Blogs" articleList={articlesWrittenByUser} />
  );
};

export default WrittenArticleList;
