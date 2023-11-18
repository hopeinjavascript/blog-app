import React from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useUserContext } from '../../context/userContext';
import './Likes.css';
import { socket } from '../../socket';

const Likes = ({ id, likes, handleUpdate, author }) => {
  const { loggedInUser } = useUserContext();

  const likeNotification = (loggedInUser, articleId, author) => {
    socket.emit('like', {
      socketId: socket.id,
      authorId: author._id,
      loggedInUser: loggedInUser, // TODO: it is sending whole user object from local Storage. CHANGE!
      articleId: articleId,
    });
  };

  return (
    <>
      <button className="btn-like">
        {!likes?.includes(loggedInUser?._id) ? (
          <AiOutlineHeart
            className="svg-like"
            onClick={() => {
              handleUpdate(id, { action: 'like' });
              likeNotification(loggedInUser, id, author);
            }}
          />
        ) : (
          <AiFillHeart
            className="svg-unlike"
            onClick={() => handleUpdate(id, { action: 'unlike' })}
          />
        )}
        <span className="dot"></span>
        <span className="likes">{likes?.length}</span>
      </button>
    </>
  );
};

export default Likes;
