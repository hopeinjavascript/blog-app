import jwt from 'jsonwebtoken';
import HTTP_STATUS_CODES from '../constants/httpStatusCodes.js';
import { verifyToken } from '../helpers/controller.js';
import genericHelpers from '../helpers/generic.js';
const { throwError } = genericHelpers;

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
