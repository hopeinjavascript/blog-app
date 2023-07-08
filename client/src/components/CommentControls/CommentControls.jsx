import React from 'react';
import './CommentControls.css';
import { VscReply } from 'react-icons/vsc';
import { AiOutlineDelete } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi';
import { useUserContext } from '../../context/userContext';
import Likes from '../Likes/Likes';

const CommentControls = ({
  comment,
  isReplying,
  isEditing,
  toggleIsReplying,
  replyCount,
  toggleIsEditing,
  handleDelete,
  handleUpdate,
}) => {
  const { loggedInUser } = useUserContext();

  return (
    <div
      className={`comment-controls ${isReplying || isEditing ? 'hide' : null}`}
    >
      {(loggedInUser?.isAdmin ||
        comment?.user?.username === loggedInUser?.username) && (
        <>
          <button className="btn btn-edit" onClick={toggleIsEditing}>
            <FiEdit2 />
          </button>
          <button
            className="btn btn-delete"
            onClick={() => handleDelete(comment._id)}
          >
            <AiOutlineDelete />
          </button>
        </>
      )}
      <button className="btn btn-reply" onClick={toggleIsReplying}>
        <VscReply />
        {/* {comment.children.length > 0 && ( */}
        <>
          <span className="dot"></span>
          <span className="likes">{replyCount}</span>
        </>
        {/* )} */}
      </button>
      <Likes
        id={comment?._id}
        likes={comment?.likes}
        handleUpdate={handleUpdate}
      />
    </div>
  );
};

export default CommentControls;
