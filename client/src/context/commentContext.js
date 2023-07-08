import { createContext, useContext, useEffect, useReducer } from 'react';
import { fetchCall } from '../helpers/fetchCall';
import commentReducer from '../reducers/comment';
import { toast } from 'react-toastify';

const CommentContext = createContext(null);

export const initialState = {
  loading: false,
  comments: [],
  comment: {},
  count: 0,
};

const CommentContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(commentReducer, initialState);

  useEffect(() => {
    // fetchComments(); // not needed
    // fetchCommentsByArticle(); // called in single article component
    return () => {};
  }, []);

  // async function fetchComments() {
  //   dispatch({ type: 'LOADING' });

  //   const resp = await fetchCall(
  //     `${process.env.REACT_APP_BLOG_APP_BACKEND_URL}${global.BASE_ROUTE}/comments`
  //   );

  //   if (!resp?.success) {
  //     toast(`${resp?.message}`, { type: 'error' });
  //     dispatch({ type: 'NOT_LOADING' });
  //   } else {
  //     dispatch({ type: 'FETCH_COMMENTS', payload: { comments: resp.data } });
  //   }
  // }

  async function fetchCommentsByArticle(articleId) {
    dispatch({ type: 'LOADING' });

    const resp = await fetchCall(
      `${process.env.REACT_APP_BLOG_APP_BACKEND_URL}${global.BASE_ROUTE}/articles/${articleId}/comments`
    );

    if (!resp?.success) {
      toast(`${resp?.message}`, { type: 'error' });
      dispatch({ type: 'NOT_LOADING' });
    } else {
      dispatch({
        type: 'FETCH_COMMENTS_BY_ARTICLE',
        payload: { comments: resp.data },
      });
    }
  }

  const handleAddComment = async (payload) => {
    dispatch({ type: 'LOADING' });

    debugger;
    const resp = await fetchCall(
      `${process.env.REACT_APP_BLOG_APP_BACKEND_URL}${global.BASE_ROUTE}/articles/${payload.articleId}/comments`,
      {
        method: 'POST',
        data: payload,
      }
    );

    if (!resp?.success) {
      toast(`${resp?.message}`, { type: 'error' });
      dispatch({ type: 'NOT_LOADING' });
    } else {
      toast(`${resp?.message}`, { type: 'success' });
      // state update not needed if we are navigating to comments page because it will fetch data on component mount
      // setComments([...comments, resp.data]);
      //   navigate(`${global.BASE_ROUTE}/comments`);
      dispatch({ type: 'ADD_COMMENT', payload: { comment: resp.data } });
    }
  };

  const handleDeleteComment = async (id) => {
    const deleteConfirmation = window.confirm(
      `Are you sure you want to delete this comment?`
    );

    if (!deleteConfirmation) {
      return;
    }

    dispatch({ type: 'LOADING' });

    const resp = await fetchCall(
      `${process.env.REACT_APP_BLOG_APP_BACKEND_URL}${global.BASE_ROUTE}/comments/${id}`,
      {
        method: 'DELETE',
      }
    );

    if (!resp?.success) {
      toast(`${resp?.message}`, { type: 'error' });
      dispatch({ type: 'NOT_LOADING' }); // for special/error cases
    } else {
      toast(`${resp?.message}`, { type: 'success' });
      dispatch({
        type: 'DELETE_COMMENT',
        payload: { comment: resp.data },
      });
    }
  };

  const handleUpdateComment = async (commentId, payload) => {
    if (!['like', 'unlike'].includes(payload.action)) {
      dispatch({ type: 'LOADING' });
    }

    debugger;

    const resp = await fetchCall(
      `${process.env.REACT_APP_BLOG_APP_BACKEND_URL}${global.BASE_ROUTE}/comments/${commentId}`,
      {
        method: 'PATCH',
        data: payload,
      }
    );

    if (!resp?.success) {
      toast(`${resp?.message}`, { type: 'error' });
      dispatch({ type: 'NOT_LOADING' });
      return;
    } else {
      if (!['like', 'unlike', 'publish'].includes(payload.action)) {
        toast(`${resp?.message}`, { type: 'success' });
      }
      dispatch({ type: 'UPDATE_COMMENT', payload: { comment: resp.data } });
    }
  };

  const val = {
    ...state,
    dispatch,
    // fetchComments,
    fetchCommentsByArticle,
    handleAddComment,
    handleDeleteComment,
    handleUpdateComment,
  };
  return (
    <CommentContext.Provider value={val}>{children}</CommentContext.Provider>
  );
};

export default CommentContextProvider;

export const useCommentContext = () => useContext(CommentContext);
