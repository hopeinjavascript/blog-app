import authServices from '../services/auth.js';

const login = async (req, res, next) => {
  res.serviceName = 'login';
  try {
    await authServices.login(req, res);
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const signup = async (req, res, next) => {
  res.serviceName = 'signup';
  try {
    await authServices.signup(req, res);
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  res.serviceName = 'forgotPassword';
  try {
    await authServices.forgotPassword(req, res);
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  res.serviceName = 'resetPassword';
  try {
    await authServices.resetPassword(req, res);
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export default { login, signup, forgotPassword, resetPassword };
