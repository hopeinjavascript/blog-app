import { createContext, useContext, useState, useEffect } from 'react';
import { fetchCall } from '../helpers/fetchCall';
import { getLocalStorage } from '../helpers/generic';

const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const foundUser = getLocalStorage('token');
    if (foundUser) {
      setLoggedInUser(foundUser);
    }
    return () => {};
  }, []);

  const val = { loggedInUser, setLoggedInUser };
  return <UserContext.Provider value={val}>{children}</UserContext.Provider>;
};

export default UserContextProvider;

export const useUserContext = () => useContext(UserContext);
