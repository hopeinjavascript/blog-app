import React from 'react';
import { IoBookmarkOutline, IoBookmark } from 'react-icons/io5';
import { useUserContext } from '../../context/userContext';
import './Bookmark.css';

const Bookmark = ({ id, bookmarks, handleUpdate }) => {
  const { loggedInUser } = useUserContext();

  return (
    <>
      <button className="btn-bookmark">
        {!bookmarks?.includes(loggedInUser?._id) ? (
          <IoBookmarkOutline
            className="svg-save"
            onClick={() => handleUpdate(id, { action: 'save' })}
          />
        ) : (
          <IoBookmark
            className="svg-unsave"
            onClick={() => handleUpdate(id, { action: 'unsave' })}
          />
        )}
        <span className="dot"></span>
        <span className="bookmarks">{bookmarks?.length}</span>
      </button>
    </>
  );
};

export default Bookmark;
