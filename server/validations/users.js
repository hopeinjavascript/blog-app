import HTTP_STATUS_CODES from '../constants/httpStatusCodes.js';
import { throwError } from '../helpers/generic.js';

const getSingleUser = (req, _, next) => {
  if (!req.params.id)
    throwError('Invalid id param', HTTP_STATUS_CODES.BAD_REQUEST);

  next();
};

const getAllArticlesByUserId = (req, _, next) => {
  if (!req.params.id)
    throwError('Invalid id param', HTTP_STATUS_CODES.BAD_REQUEST);

  next();
};

const getAllArticlesSavedByUserId = (req, _, next) => {
  if (!req.params.id)
    throwError('Invalid id param', HTTP_STATUS_CODES.BAD_REQUEST);

  next();
};

const deleteUser = (req, _, next) => {
  if (!req.params.id)
    throwError('Invalid id param', HTTP_STATUS_CODES.BAD_REQUEST);

  next();
};

const updateUser = (req, _, next) => {
  const { action, title, coverImage, content } = req.body;

  if (!req.params.id)
    throwError('Invalid id param', HTTP_STATUS_CODES.BAD_REQUEST);

  if (!action)
    throwError('"action" is required', HTTP_STATUS_CODES.BAD_REQUEST);

  if (action === 'edit' && (!title || !coverImage || !content)) {
    throwError('title and content is required', HTTP_STATUS_CODES.BAD_REQUEST);
  }

  next();
};

export default {
  getSingleUser,
  getAllArticlesByUserId,
  getAllArticlesSavedByUserId,
  deleteUser,
  updateUser,
};
