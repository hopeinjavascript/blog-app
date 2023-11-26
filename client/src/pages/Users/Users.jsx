import React, { useEffect, useState } from 'react';
import './Users.css';
import { fetchCall } from '../../helpers/fetchCall';
import { toast } from 'react-toastify';
import Table from '../../components/Table/Table';

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
    <section className="page-section">
      <div className="users-wrapper">
        <header>
          <h1 className="page-header">users</h1>

          {/* <button type="button" className="btn-primary">
            Add User
            <IoAdd className="btn-icon-right" />
          </button> */}
        </header>
        <hr />
        {users?.length ? (
          <Table
            data={users}
            config={{
              columns: ['_id', 'name', 'username', 'email', 'roleId'], // TODO: add support for column name aliasing
              // extraColumns: ['action'],
              // extraData: [{ action: 'Delete' }],
            }}
          />
        ) : null}
      </div>
    </section>
  );
};

export default Users;
