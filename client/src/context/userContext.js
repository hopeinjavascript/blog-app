import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { fetchCall } from '../helpers/fetchCall';
import { getLocalStorage } from '../helpers/generic';
import userReducer from '../reducers/user';
import { toast } from 'react-toastify';

const UserContext = createContext(null);

const initialState = {
  loading: false, // idle | succeeded | loading
  users: [],
  user: {},
};

const UserContextProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const foundUser = getLocalStorage('token');
    if (foundUser) {
      setLoggedInUser(foundUser);
    }
    return () => {};
  }, []);

  async function fetchUser(userId) {
    dispatch({ type: 'LOADING' });

    const resp = await fetchCall(
      `${process.env.REACT_APP_BLOG_APP_BACKEND_URL}/users/${userId}`
    );

    if (!resp?.success) {
      toast(`${resp?.message}`, { type: 'error' });
      dispatch({ type: 'NOT_LOADING' });
    } else {
      console.log(resp.data);
      // setUser(resp.data);
      dispatch({ type: 'FETCH_USER', payload: { user: resp.data } });
    }
  }

  const handleUpdateUser = async (userId, payload) => {
    dispatch({ type: 'LOADING' });

    const resp = await fetchCall(
      `${process.env.REACT_APP_BLOG_APP_BACKEND_URL}/users/${userId}`,
      {
        method: 'PATCH',
        data: payload,
      }
    );

    if (!resp?.success) {
      toast(`${resp?.message}`, { type: 'error' });
      dispatch({ type: 'NOT_LOADING' });
    } else {
      toast(`${resp?.message}`, { type: 'success' });
      dispatch({ type: 'UPDATE_USER', payload: { user: resp.data } });
    }
  };

  const val = useMemo(() => ({
    loggedInUser,
    setLoggedInUser,
    ...state,
    dispatch,
    fetchUser,
    handleUpdateUser,
  }));
  return <UserContext.Provider value={val}>{children}</UserContext.Provider>;
};

export default UserContextProvider;

export const useUserContext = () => useContext(UserContext);
