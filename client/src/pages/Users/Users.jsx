import React, { useEffect, useState } from 'react';
import './Users.css';
import { fetchCall } from '../../helpers/fetchCall';
import { toast } from 'react-toastify';
import UserProfileLink from '../../components/UserProfileLink/UserProfileLink';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      const resp = await fetchCall(
        `${process.env.REACT_APP_BLOG_APP_BACKEND_URL}/users`
      );

      if (!resp?.success) {
        toast(`${resp?.message}`, { type: 'error' });
      } else {
        console.log(resp.data);
        setUsers(resp.data);
      }
    }

    fetchUser();

    return () => {};
  }, []);

  return (
    <section className="page-section fd-col">
      {users.map((user) => {
        return (
          <h1 key={user?._id}>
            <UserProfileLink user={user} text={user?.name} />
          </h1>
        );
      })}
    </section>
  );
};

export default Users;
