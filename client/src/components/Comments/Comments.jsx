import React from 'react';
import './Comments.css';
import Comment from '../Comment/Comment';

const Comments = ({ comments, getChildComments }) => {
  return (
    <div className="comments">
      {comments?.map((comment) => {
        return (
          <Comment
            key={comment._id}
            comment={comment}
            children={getChildComments(comment._id)}
            getChildComments={getChildComments}
          />
        );
      })}
    </div>
  );
};

export default Comments;
