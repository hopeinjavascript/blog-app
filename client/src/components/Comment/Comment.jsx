import React, { useState } from 'react';
import { useUserContext } from '../../context/userContext';
import AddCommentOrReply from '../AddCommentOrReply/AddCommentOrReply';
import { formatArticleDate } from '../../helpers/generic';
import ReplyThread from '../ReplyThread/ReplyThread';
import './Comment.css';
import CommentControls from '../CommentControls/CommentControls';
import { useCommentContext } from '../../context/commentContext';

const Comment = ({ comment, children, getChildComments }) => {
  const { loggedInUser } = useUserContext();

  const { handleAddComment, handleDeleteComment, handleUpdateComment } =
    useCommentContext();

  const {
    _id,
    parentId,
    content,
    user,
    editCount,
    article: articleId,
    createdAt,
  } = comment;

  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const toggleIsReplying = () => setIsReplying(!isReplying);
  const toggleIsEditing = () => setIsEditing(!isEditing);

  return (
    <div className="comment-container" key={_id || parentId}>
      <div className="comment">
        <div className="comment-picture">
          <div>
            <img
              className="profile-picture"
              src="//unsplash.it/50"
              alt="profile"
            />
          </div>
        </div>
        <div className="comment-content">
          <div className="comments__profile">
            <h3 className="profile-name">{user?.name}</h3>
            <span className="dot"></span>
            {/* <span className="comment-date">{`${dd} ${mmm} ${yyyy}`}</span> */}
            <span className="comment-date">{formatArticleDate(createdAt)}</span>
            {editCount > 0 && (
              <>
                <span className="dot"></span>
                <span className="comment-edited">Edited ({editCount})</span>
                {/* <span className="dot"></span>
                <span className="edited-date">{`${dd} ${mmm} ${yyyy}`}</span> */}
              </>
            )}
          </div>

          <p className="comments__text">{content}</p>

          <CommentControls
            comment={comment}
            isReplying={isReplying}
            toggleIsReplying={toggleIsReplying}
            replyCount={children?.length}
            isEditing={isEditing}
            toggleIsEditing={toggleIsEditing}
            handleDelete={handleDeleteComment}
            handleUpdate={handleUpdateComment}
          />
        </div>
      </div>

      {/* replying */}
      {isReplying && (
        <AddCommentOrReply
          handler={(commentContent) => {
            handleAddComment({
              articleId,
              // parentId: _id, // recursive (infinite depth)
              parentId: parentId ? parentId : _id, // (depth level 1)
              ...commentContent,
            }); //id = parentId for the nested comment
            toggleIsReplying();
          }}
          btnText="Reply"
          handleCancel={toggleIsReplying}
        />
      )}

      {/* editing */}
      {isEditing && (
        <AddCommentOrReply
          handler={(editedText) => {
            handleUpdateComment(_id, { action: 'edit', ...editedText });
            toggleIsEditing();
          }}
          btnText="Edit"
          handleCancel={toggleIsEditing}
          text={content}
        />
      )}

      <ReplyThread
        id={_id}
        children={children}
        getChildComments={getChildComments}
      />
    </div>
  );
};

export default Comment;
