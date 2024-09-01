import React from 'react';
import './ArticleList.css';
import ClientSidePagination from '../Pagination/ClientSidePagination';
import Article from '../Article/Article';

const ArticleList = ({ list = [] }) => {
  return (
    <ClientSidePagination
      list={list}
      render={(article) => <Article article={article} />}>
      {/* {list.map(()} */}
    </ClientSidePagination>
  );
};

export default ArticleList;
