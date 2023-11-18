import React, { useEffect, useRef, useState } from 'react';
import { FiLock, FiMail } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { BiLogInCircle } from 'react-icons/bi';
import Button from '../../components/Button/Button';
import { BsCheck2 } from 'react-icons/bs';
import { useUserContext } from '../../context/userContext';
import { toast } from 'react-toastify';
import { fetchCall } from '../../helpers/fetchCall';
import { setLocalStorage } from '../../helpers/generic';
import { socket } from '../../socket';

const Login = () => {
  const [loadingStatus, setLoadingStatus] = useState('idle');
  const { setLoggedInUser } = useUserContext();

  const refForm = useRef(null);

  useEffect(() => {
    refForm.current[0].focus();
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userObj = {
      email: refForm.current[0].value,
      password: refForm.current[1].value,
    };

    if (!userObj.email || !userObj.password)
      return alert('Fill in all the fields');

    setLoadingStatus('loading');

    const resp = await fetchCall(
      `${process.env.REACT_APP_BLOG_APP_BACKEND_URL}/auth/login`,
      {
        method: 'POST',
        data: userObj,
      }
    );

    setLoadingStatus('idle');

    if (!resp?.success) {
      return toast(`${resp?.message}`, { type: 'error' });
    } else {
      toast(`${resp?.message}`, { type: 'success' });

      // emit "welcome"
      socket.emit('welcome', {
        socketId: socket.id,
        loggedInUser: resp?.data,
      });

      setLocalStorage('token', resp?.data);
      setLoggedInUser(resp?.data);
      // setLoadingStatus('succeeded');
      navigate('/');
    }
  };

  return (
    <section className="page-section">
      <div className="form-wrapper">
        <h2 className="page-title">Login</h2>
        <form onSubmit={handleSubmit} ref={refForm} className="form login-form">
          <div className="form-input">
            <label className="label form-label" htmlFor="email">
              Email
            </label>
            <div className="user-input">
              <FiMail />
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                defaultValue="akshaysood@gmail.com"
              />
            </div>
          </div>
          <div className="form-input">
            <label className="label form-label" htmlFor="password">
              password
            </label>
            <div className="user-input">
              <FiLock />
              <input
                type="password"
                name="password"
                id="password"
                defaultValue="akshaysood"
              />
            </div>
          </div>

          <Button
            status={loadingStatus}
            btnText="Authenticate"
            btnIcon={BiLogInCircle}
            btnLoadingText="Authenticating..."
            btnSuccessText="Authenticated"
            btnSuccessIcon={BsCheck2}
          />
          <hr />

          <div className="extra-links">
            <Link to="/forgot-password">Forgot password?</Link>
            <br />
            <Link to="/signup">Don't have an account?</Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
