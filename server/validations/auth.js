import HTTP_STATUS_CODES from '../constants/httpStatusCodes.js';
import { throwError } from '../helpers/generic.js';

const login = (req, _, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    throwError('All fields are required', HTTP_STATUS_CODES.BAD_REQUEST);

  next();
};

const signup = (req, _, next) => {
  const { name, email, password } = req.body;
  console.log({ name, email, password });

  if (!name || !email || !password)
    throwError('All fields are required', HTTP_STATUS_CODES.BAD_REQUEST);

  next();
};

const forgotPassword = (req, _, next) => {
  const { email } = req.body;

  if (!email) throwError('Email is required', HTTP_STATUS_CODES.BAD_REQUEST);

  next();
};

const resetPassword = (req, _, next) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  if (!token)
    throwError(
      'Reset Token is required',
      HTTP_STATUS_CODES.STATUS_CODE_BAD_REQUEST
    );

  if (!password || !confirmPassword)
    throwError('All fields are required', HTTP_STATUS_CODES.BAD_REQUEST);

  if (password !== confirmPassword)
    throwError(`Password doesn't match`, HTTP_STATUS_CODES.BAD_REQUEST);

  next();
};

export default { login, signup, forgotPassword, resetPassword };
