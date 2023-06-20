import HTTP_STATUS_CODES from '../constants/httpStatusCodes.js';
import { verifyToken } from '../helpers/auth.js';
import { throwError } from '../helpers/generic.js';

function err() {
  throwError('Auth: you are not authorized!', HTTP_STATUS_CODES.FORBIDDEN);
}

function auth(req, res, next) {
  res.serviceName = 'Auth Middleware';

  if (!req.headers.authorization) err();

  // token format = 'Bearer <token>'
  const token = req.headers.authorization.split(' ')[1];

  if (!token) err();

  verifyToken(token, 'access', req);
  next();
}

export default auth;
