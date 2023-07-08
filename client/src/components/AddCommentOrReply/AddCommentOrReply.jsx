import React, { useEffect, useRef } from 'react';
import './AddCommentOrReply.css';
import { HiReply } from 'react-icons/hi';
import { FiEdit2 } from 'react-icons/fi';
import { IoAdd, IoBanOutline } from 'react-icons/io5';
import { IoIosRefresh } from 'react-icons/io';
import { useUserContext } from '../../context/userContext';

const AddCommentOrReply = ({
  handler,
  btnText,
  handleCancel,
  text = null, // * to get the current text of the comment/reply
}) => {
  const inputRef = useRef(text);

  const { loggedInUser } = useUserContext();

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.value = text; // we can set the text here because we have the reference to the underlying DOM node.
    return () => {};
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle empty string
    if (inputRef.current.value) handler({ content: inputRef.current.value });
    inputRef.current.value = '';
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <img
        className="profile-picture-img"
        src="//unsplash.it/60"
        alt="profile"
      />
      <textarea
        ref={inputRef}
        name="comment"
        className="comment-input"
        placeholder={
          loggedInUser?.name
            ? `@${loggedInUser.name?.split(' ')[0]} Enter your comment`
            : null
        }
        rows={btnText === 'Reply' || btnText === 'Edit' ? '5' : '3'}
      />
      <div className="cta-column">
        <button type="submit" className="btn icon-btn">
          {btnText ?? 'Submit'}

          {btnText === 'Reply' ? (
            <HiReply />
          ) : btnText === 'Edit' ? (
            <FiEdit2 />
          ) : (
            <IoAdd />
          )}
        </button>
        {(btnText === 'Reply' || btnText === 'Edit') && (
          <button type="button" onClick={handleCancel} className="btn icon-btn">
            Cancel
            <IoBanOutline />
          </button>
        )}
        <button type="reset" className="btn icon-btn">
          Reset <IoIosRefresh />
        </button>
      </div>
    </form>
  );
};
export default AddCommentOrReply;
