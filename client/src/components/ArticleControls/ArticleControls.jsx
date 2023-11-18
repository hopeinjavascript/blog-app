import React from 'react';
import Likes from '../Likes/Likes';
import { useUserContext } from '../../context/userContext';
import './ArticleControls.css';
import { Link } from 'react-router-dom';

import { AiOutlineDelete } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi';
import { IoCloudOfflineOutline, IoCloudOutline } from 'react-icons/io5';
import Bookmark from '../Bookmark/Bookmark';

const ArticleControls = ({ article, handleDelete, handleUpdate, author }) => {
  const { loggedInUser } = useUserContext();

  let deleteButton, editButton, publishButton;
  if (
    loggedInUser?.isAdmin ||
    article?.user?.username === loggedInUser?.username
  ) {
    deleteButton = (
      <button className="btn-delete" onClick={() => handleDelete(article?._id)}>
        <AiOutlineDelete />
      </button>
    );

    editButton = (
      <Link to={`${global.BASE_ROUTE}/articles/edit`} state={{ article }}>
        <button className="btn-edit">
          <FiEdit2 />
        </button>
      </Link>
    );

    publishButton = (
      <button
        className="btn-publish"
        onClick={() => handleUpdate(article?._id, { action: 'publish' })}>
        {!article?.isPublish ? (
          <IoCloudOutline className="cloud" />
        ) : (
          <IoCloudOfflineOutline className="cloud" />
        )}
      </button>
    );
  }

  return (
    <div className="article-controls">
      {editButton}
      {deleteButton}
      {publishButton}
      <Bookmark
        id={article?._id}
        bookmarks={article?.bookmarks}
        handleUpdate={handleUpdate}
      />
      <Likes
        id={article?._id}
        likes={article?.likes}
        handleUpdate={handleUpdate}
        author={author}
      />
    </div>
  );
};

export default ArticleControls;
