import jwt from 'jsonwebtoken';
import HTTP_STATUS_CODES from '../constants/httpStatusCodes.js';
import { throwError } from './generic.js';

function getJwtInfo(type) {
  let secret, expiresIn;
  if (type === 'access') {
    secret = process.env.JWT_ACCESS_TOKEN_SECRET;
    expiresIn = process.env.JWT_ACCESS_TOKEN_EXPIRATION ?? '15m';
  } else if (type === 'refresh') {
    secret = process.env.JWT_REFRESH_TOKEN_SECRET;
    expiresIn = process.env.JWT_REFRESH_TOKEN_EXPIRATION ?? '1y';
  }

  return { secret, expiresIn };
}

function createToken(payload, type) {
  if (!payload) throwError('Provide token');
  if (!type) throwError('Provide token type');

  const { secret, expiresIn } = getJwtInfo(type);

  const token = jwt.sign(payload, secret, {
    expiresIn,
    issuer: '',
    audience: '',
  });

  return token;
}

function verifyToken(token, type, req) {
  if (!token) throwError('Provide token');
  if (!type) throwError('Provide token type');

  const { secret } = getJwtInfo(type);

  jwt.verify(token, secret, (err, payload) => {
    if (err)
      throwError(
        `Error while decoding refresh token data - ${err.message}`,
        HTTP_STATUS_CODES.FORBIDDEN,
        err
      );

    req.user = payload;
  });
}

export { createToken, verifyToken };
