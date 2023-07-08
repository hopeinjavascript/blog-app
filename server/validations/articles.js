import HTTP_STATUS_CODES from '../constants/httpStatusCodes.js';
import { throwError } from '../helpers/generic.js';

const createArticle = (req, _, next) => {
  const { title, coverImage, content } = req.body;

  if (!title || !coverImage || !content)
    throwError('All fields are required', HTTP_STATUS_CODES.BAD_REQUEST);

  next();
};

const getSingleArticle = (req, _, next) => {
  if (!req.params.id)
    throwError('Invalid id param', HTTP_STATUS_CODES.BAD_REQUEST);

  next();
};

const deleteArticle = (req, _, next) => {
  if (!req.params.id)
    throwError('Invalid id param', HTTP_STATUS_CODES.BAD_REQUEST);

  next();
};

const updateArticle = (req, _, next) => {
  const { action, title, coverImage, content } = req.body;

  if (!req.params.id)
    throwError('Invalid id param', HTTP_STATUS_CODES.BAD_REQUEST);

  if (!action)
    throwError('"action" is required', HTTP_STATUS_CODES.BAD_REQUEST);

  if (action === 'edit' && (!title || !coverImage || !content)) {
    throwError('All fields are required', HTTP_STATUS_CODES.BAD_REQUEST);
  }

  next();
};

export default {
  createArticle,
  getSingleArticle,
  deleteArticle,
  updateArticle,
};
