import React, { useRef, useState } from 'react';
import { FiLock } from 'react-icons/fi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '../../components/Button/Button';
import { BsCheck2 } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { fetchCall } from '../../helpers/fetchCall';

const ResetPassword = ({ history }) => {
  const [loadingStatus, setLoadingStatus] = useState('idle');
  const refForm = useRef(null);

  const { token } = useParams();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const password = refForm.current[0].value;
    const confirmPassword = refForm.current[1].value;

    if (!password) return alert('Please provide new password');
    if (!confirmPassword) return alert('Please confirm your new password');

    if (password !== confirmPassword)
      return toast(`Password doesn't match`, { type: 'error' });

    setLoadingStatus('loading');

    const resp = await fetchCall(
      `${process.env.REACT_APP_BLOG_APP_BACKEND_URL}/auth/reset-password/${token}`,
      {
        method: 'POST',
        data: { password, confirmPassword },
      }
    );

    setLoadingStatus('idle');

    if (!resp?.success) {
      return toast(`${resp?.message}`, { type: 'error' });
    } else {
      toast(`${resp?.message}`, { type: 'success' });
      setLoadingStatus('succeeded');

      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }

  return (
    <section className="page-section">
      <div className="form-wrapper">
        <h2 className="page-title">Reset Password</h2>

        <form
          onSubmit={handleSubmit}
          className="form reset-password-form"
          ref={refForm}>
          <div className="form-input">
            <label className="label form-label" htmlFor="new-password">
              New Password
            </label>
            <div className="user-input">
              <FiLock />
              <input type="password" name="password" id="password" required />
            </div>
          </div>

          <div className="form-input">
            <label className="label form-label" htmlFor="confirm-new-password">
              Confirm New Password
            </label>
            <div className="user-input">
              <FiLock />
              <input
                type="password"
                name="confirmPassword"
                id="password"
                required
              />
            </div>
          </div>
          <Button
            status={loadingStatus}
            btnText="Reset Password"
            btnIcon={RiLockPasswordLine}
            btnLoadingText="Resetting Password..."
            btnSuccessText="Password reset was successFul"
            btnSuccessIcon={BsCheck2}
          />
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
