import authServices from '../services/auth.js';

const login = (req, res, next) => {
  try {
    return authServices.login(req, res, next);
  } catch (error) {
    console.error(error);
  }
};

const signup = (req, res, next) => {
  try {
    return authServices.signup(req, res, next);
  } catch (error) {
    console.error(error);
  }
};

export default { login, signup };
