const login = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'login route' });
};

const signup = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'signup route' });
};

export default { login, signup };
