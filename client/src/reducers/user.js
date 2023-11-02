const userReducer = (state, action) => {
  if (action.type === 'LOADING') {
    // loading values can be => idle | succeeded | loading
    return { ...state, loading: true };
  }

  if (action.type === 'NOT_LOADING') {
    // for special/error cases
    return { ...state, loading: false };
  }

  if (action.type === 'FETCH_USER') {
    console.log('FETCH_USER', action);
    return { ...state, loading: false, user: action.payload.user };
  }

  return { msg: 'default state', ...state };
};
export default userReducer;
