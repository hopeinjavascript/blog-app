const commentReducer = (state, action) => {
  if (action.type === 'LOADING') {
    // loading values can be => idle | succeeded | loading
    return { ...state, loading: true };
  }

  if (action.type === 'NOT_LOADING') {
    // for special/error cases
    return { ...state, loading: false };
  }

  if (action.type === 'FETCH_COMMENTS_BY_ARTICLE') {
    console.log('FETCH_COMMENTS', action);
    return { ...state, loading: false, comments: action.payload.comments };
  }

  if (action.type === 'ADD_COMMENT') {
    console.log('[ADD_COMMENT]', action);
    return {
      ...state,
      loading: false,
      // adding at the beginning to show the latest comment on top of the list
      comments: [...state.comments, action.payload.comment],
    };
  }

  if (action.type === 'DELETE_COMMENT') {
    console.log('DELETE_COMMENT', action);
    return {
      ...state,
      loading: false,
      comments: state.comments.filter(
        (comment) => comment._id !== action.payload.comment._id
      ),
    };
  }

  if (action.type === 'UPDATE_COMMENT') {
    console.log('UPDATE_COMMENT', action);

    return {
      ...state,
      loading: false,

      // (1.)
      // try commenting below
      // (1.1.) Single comment state will reflect changes whereas comments as a whole list is displayed on the page
      // so updating below as well
      comments: state.comments.map((comment) =>
        comment._id === action.payload.comment._id
          ? action.payload.comment
          : comment
      ),

      // for every "action" in req.body we are sending updated document in the response from server
      // so as per pt (1.) we are specifically updating this to reflect changes in a single comment for all the "actions" made
      // * NOT NEEDED but... Ideally below should ONLY be updated when single comment is fetched -> refer pt. (1.1.)
      comment: action.payload.comment ?? state.comment,
    };
  }

  return { msg: 'default state', ...state };
};
export default commentReducer;
