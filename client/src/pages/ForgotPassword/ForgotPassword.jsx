import React, { useRef, useState } from 'react';
import { FiMail, FiSend } from 'react-icons/fi';
import { BsCheck2 } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { fetchCall } from '../../helpers/fetchCall';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [loadingStatus, setLoadingStatus] = useState('idle');
  // const { setLoggedInUser } = useUserContext();

  const refEmail = useRef('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = refEmail.current.value;

    if (!email) return alert('Please provide email');

    setLoadingStatus('loading');

    const resp = await fetchCall(
      `${process.env.REACT_APP_BLOG_APP_BACKEND_URL}/auth/forgot-password`,
      {
        method: 'POST',
        data: { email },
      }
    );

    setLoadingStatus('idle');

    if (!resp?.success) {
      return toast(`${resp?.message}`, { type: 'error' });
    } else {
      toast(`${resp?.message}`, { type: 'success' });
      // setLoadingStatus('succeeded');
    }
  };

  return (
    <section className="page-section">
      <div className="form-wrapper">
        <h2 className="page-title">Forgot Password</h2>

        <form onSubmit={handleSubmit} className="form forgot-password-form">
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
                required
                defaultValue="akkis1993@gmail.com"
                ref={refEmail}
              />
            </div>
          </div>
          <Button
            status={loadingStatus}
            btnText="Send email"
            btnIcon={FiSend}
            btnLoadingText="Sending..."
            btnSuccessText="Sent"
            btnSuccessIcon={BsCheck2}
          />

          <hr />
          <div className="extra-links">
            <Link to="/reset-password/token-goes-here">Reset password?</Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
