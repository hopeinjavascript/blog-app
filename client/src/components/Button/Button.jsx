import React from 'react';
import Loader from '../Loader/Loader';

const Button = ({
  status,
  btnText,
  btnIcon: ButtonIcon,
  btnLoadingText,
  btnSuccessText,
  btnSuccessIcon: ButtonSuccessIcon,
}) => {
  let elem = null;

  if (status === 'loading') {
    elem = (
      <>
        {btnLoadingText}
        <Loader height="20px" width="20px" border="2px" marginleft=".5rem" />
      </>
    );
  } else if (status === 'succeeded') {
    elem = (
      <>
        {btnSuccessText}
        {<ButtonSuccessIcon className="btn-icon-right" />}
      </>
    );
  } else {
    elem = (
      <>
        {btnText}
        {<ButtonIcon className="btn-icon-right" />}
      </>
    );
  }

  return (
    <button
      type="submit"
      className="btn btn-submit form-btn"
      style={{
        cursor: status === 'loading' ? 'wait' : 'pointer',
      }}
    >
      {elem}
    </button>
  );
};

export default Button;
