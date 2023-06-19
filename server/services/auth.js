import { setResponse, throwError } from '../helpers/generic.js';
import { createToken } from '../helpers/auth.js';
import bcrypt from 'bcryptjs';
import UserModel from '../models/user.js';
import HTTP_STATUS_CODES from '../constants/httpStatusCodes.js';

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) throwError('Invalid credentials', HTTP_STATUS_CODES.UNAUTHORIZED);

  const hasPasswordMatched = await bcrypt.compare(password, user.password);

  if (!hasPasswordMatched)
    throwError('Invalid credentials', HTTP_STATUS_CODES.UNAUTHORIZED);

  //secret key is generated using crypto.randomBytes(30).toString('hex');
  const jwtPayload = { email };
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

export default { login, signup };
