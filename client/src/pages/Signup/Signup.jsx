import React, { useRef, useEffect, useState } from 'react';
import { FiArrowRightCircle, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { BsCheck2 } from 'react-icons/bs';
import { fetchCall } from '../../helpers/fetchCall';
import { toast } from 'react-toastify';

const Signup = () => {
  const [loadingStatus, setLoadingStatus] = useState('idle');

  const refForm = useRef(null);

  useEffect(() => {
    refForm.current[0].focus();
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userObj = {
      name: refForm.current[0].value,
      username: refForm.current[1].value || '', // not mandatory
      email: refForm.current[2].value,
      password: refForm.current[3].value,
    };

    if (!userObj.name || !userObj.email || !userObj.password)
      return alert('Fill in all the fields');

    setLoadingStatus('loading');

    const resp = await fetchCall(
      `${process.env.REACT_APP_BLOG_APP_BACKEND_URL}/auth/signup`,
      {
        method: 'POST',
        data: userObj,
      }
    );

    setLoadingStatus('idle');

    if (!resp.success) {
      return toast(`${resp.message}`, { type: 'error' });
    } else {
      toast(`${resp.message}`, { type: 'success' });
      navigate('/login');
    }
  };

  return (
    <section className="page-section">
      <div className="form-wrapper">
        <h2 className="page-title">Signup</h2>

        <form
          onSubmit={handleSubmit}
          ref={refForm}
          className="form signup-form"
        >
          <div className="form-input">
            <label className="label form-label" htmlFor="name">
              name
            </label>
            <div className="user-input">
              <FiUser />
              {/* {value attirbute for testing} */}
              <input type="text" name="name" id="name" required />
            </div>
          </div>

          <div className="form-input">
            <label className="label form-label" htmlFor="username">
              username
            </label>
            <div className="user-input">
              <FiUser />

              <input type="text" name="username" id="username" />
            </div>
          </div>

          <div className="form-input">
            <label className="label form-label" htmlFor="email">
              email
            </label>
            <div className="user-input">
              <FiMail />
              <input type="email" name="email" id="email" required />
            </div>
          </div>

          <div className="form-input">
            <label className="label form-label" htmlFor="password">
              password
            </label>
            <div className="user-input">
              <FiLock />
              <input type="password" name="password" id="password" required />
            </div>
          </div>

          <Button
            status={loadingStatus}
            btnText="Sign Up"
            btnIcon={FiArrowRightCircle}
            btnLoadingText=" Signing up..."
            btnSuccessText="Signed Up"
            btnSuccessIcon={BsCheck2}
          />

          <hr />

          <div className="extra-links">
            <Link to="/login">Already have an account?</Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signup;
