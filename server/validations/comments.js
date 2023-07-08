import HTTP_STATUS_CODES from '../constants/httpStatusCodes.js';
import { throwError } from '../helpers/generic.js';

const createComment = (req, _, next) => {
  const { content } = req.body;

  // where req.params.id is the id of the article
  if (!req.params.id)
    throwError('Invalid id param', HTTP_STATUS_CODES.BAD_REQUEST);

  if (!content)
    throwError('All fields are required', HTTP_STATUS_CODES.BAD_REQUEST);

  next();
};

const getCommentsByArticle = (req, _, next) => {
  // where req.params.id is the id of the article
  if (!req.params.id)
    throwError('Invalid id param', HTTP_STATUS_CODES.BAD_REQUEST);

  next();
};

const getCommentsByUser = (req, _, next) => {
  // where req.params.id is the id of the article
  if (!req.params.id)
    throwError('Invalid id param', HTTP_STATUS_CODES.BAD_REQUEST);

  next();
};

const deleteComment = (req, _, next) => {
  if (!req.params.id)
    throwError('Invalid id param', HTTP_STATUS_CODES.BAD_REQUEST);

  next();
};

const updateComment = (req, _, next) => {
  const { action, content } = req.body;

  if (!req.params.id)
    throwError('Invalid id param', HTTP_STATUS_CODES.BAD_REQUEST);

  if (!action)
    throwError('"action" is required', HTTP_STATUS_CODES.BAD_REQUEST);

  if (action === 'edit' && !content) {
    throwError('content is required', HTTP_STATUS_CODES.BAD_REQUEST);
  }

  next();
};

export default {
  createComment,
  getCommentsByArticle,
  getCommentsByUser,
  deleteComment,
  updateComment,
};
