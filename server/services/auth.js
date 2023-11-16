import { setResponse, throwError } from '../helpers/generic.js';
import { createToken } from '../helpers/auth.js';
import bcrypt from 'bcryptjs';
import UserModel from '../models/user.js';
import HTTP_STATUS_CODES from '../constants/httpStatusCodes.js';
import sendEmail from '../utils/sendEmail.js';
import crypto from 'crypto';

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) throwError('Invalid credentials', HTTP_STATUS_CODES.UNAUTHORIZED);

  const hasPasswordMatched = await bcrypt.compare(password, user.password);

  if (!hasPasswordMatched)
    throwError('Invalid credentials', HTTP_STATUS_CODES.UNAUTHORIZED);

  //secret key is generated using crypto.randomBytes(30).toString('hex');
  const jwtPayload = { email, id: user._doc._id };
  const accessToken = createToken(jwtPayload, 'access');

  if (!accessToken) throwError('Error while signing the token');

  setResponse(res)(HTTP_STATUS_CODES.SUCCESS, 'Login Successful', {
    ...user._doc,
    accessToken,
  });
};

const signup = async (req, res) => {
  const { email, username, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (user?.email)
    throwError('User/Email already exists', HTTP_STATUS_CODES.BAD_REQUEST);

  req.body['username'] = username
    ? username
    : // : name.toLowerCase().replace(/ /g, '');
      email.slice(0, email.indexOf('@'));

  // (1.)
  // below condition automatically validates minLength as defined in the UserModel
  // because it tries to save and if mongoose doesn't find it having a length of 8 then it throws error
  // if below condition is not provided then even 6 chars password will be inserted
  // because it is hashed before inserting so it becomes > 8
  if (password.length >= 8) {
    const hashedPassword = await bcrypt.hash(password, 12);
    req.body.password = hashedPassword;
  }

  const newUser = new UserModel(req.body);
  const savedUser = await newUser.save(); // (2.) fails here!! Because it doesn't pass the if condition

  !savedUser && throwError('Sign Up Unsuccessful');

  setResponse(res)(HTTP_STATUS_CODES.CREATED, 'Sign Up Successful', savedUser);
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) throwError('Invalid Email', 404);

  // create a link to send
  const resetToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordToken = resetToken;
  user.resetPasswordTokenExpiration = Date.now() * 3600000; // valid for one hour
  const savedUser = await user.save();

  if (!savedUser) throwError('Error in creating reset link');

  const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
  const subject = 'Password Reset';
  const emailMessage = `
      <h1>You requested for password reset</h1>
      <p>Click the <a href=${resetLink} clicktracking=off>link</a> to reset.</p>
      <strong> Valid for one hour </strong>
      `;

  try {
    console.log({ emailMessage });
    sendEmail(user.email, subject, emailMessage);
    setResponse(res)(
      HTTP_STATUS_CODES.STATUS_CODE_OK,
      'Please check your email for password reset link!'
    );
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiration = undefined;
    await user.save();

    throwError(
      'Error in sending email',
      HTTP_STATUS_CODES.STATUS_CODE_INTERNAL_SERVER_ERROR,
      error
    );
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await UserModel.findOne({
    resetPasswordToken: token,
    resetPasswordTokenExpiration: { $gt: Date.now() },
  });

  if (!user)
    throwError('Reset password token is incorrect or might have expired.');

  // hash new password before saving
  const hashPassword = await bcrypt.hash(password, 12);
  user.password = hashPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpiration = undefined;
  await user.save();

  setResponse(res)(
    HTTP_STATUS_CODES.STATUS_CODE_CREATED,
    'Password reset successful.'
  );
};

export default { login, signup, forgotPassword, resetPassword };
