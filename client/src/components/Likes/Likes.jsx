import React from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useUserContext } from '../../context/userContext';
import './Likes.css';

const Likes = ({ id, likes, handleUpdate }) => {
  const { loggedInUser } = useUserContext();

  return (
    <>
      <button className="btn-like">
        {!likes?.includes(loggedInUser?._id) ? (
          <AiOutlineHeart
            className="svg-like"
            onClick={() => handleUpdate(id, { action: 'like' })}
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
