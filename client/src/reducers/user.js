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

  if (action.type === 'ADD_USER') {
    console.log('[ADD_USER]', action);
    return {
      ...state,
      loading: false,
      // adding at the beginning to show the latest user on top of the list
      users: [...state.users, action.payload.user],
    };
  }

  if (action.type === 'DELETE_USER') {
    console.log('DELETE_USER', action);
    return {
      ...state,
      loading: false,
      users: state.users.filter((user) => user._id !== action.payload.user._id),
    };
  }

  if (action.type === 'UPDATE_USER') {
    console.log('UPDATE_USER', action);

    return {
      ...state,
      loading: false,

      // COPIED from articles context
      // (1.)
      // try commenting below
      // (1.1.) Single user state will reflect changes whereas users as a whole list is displayed on the page
      // so updating below as well
      users: state.users.map((user) =>
        user._id === action.payload.user._id ? action.payload.user : user
      ),

      // for every "action" in req.body we are sending updated document in the response from server
      // so as per pt (1.) we are specifically updating this to reflect changes in a single user for all the "actions" made
      // * NOT NEEDED but... Ideally below should ONLY be updated when single user is fetched -> refer pt. (1.1.)
      user: action.payload.user ?? state.user,
    };
  }

  return { msg: 'default state', ...state };
};
export default userReducer;
