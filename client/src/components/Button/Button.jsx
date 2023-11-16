import React from 'react';
import Loader from '../Loader/Loader';

const Button = ({
  type,
  status,
  btnText,
  btnIcon: ButtonIcon,
  btnLoadingText,
  btnSuccessText,
  btnSuccessIcon: ButtonSuccessIcon,
  disabled,
  clickHandler = () => {},
  className,
  styles,
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
      type={type ?? 'submit'}
      className={`btn btn-submit form-btn ${className ?? ''}`}
      style={{
        cursor: ['loading', 'succeeded'].includes(status)
          ? 'not-allowed'
          : 'pointer',
        ...styles,
      }}
      disabled={disabled ?? ['loading', 'succeeded'].includes(status)}
      onClick={
        // ['', 'idle'].includes(status) ? (e) => clickHandler(e) : () => {} // TODO: check the condition
        (e) => clickHandler(e)
      } // dont apply clickHandler when status is loading and succeeded // Additional guard clause
    >
      {elem}
    </button>
  );
};

export default Button;
