import HTTP_STATUS_CODES from '../constants/httpStatusCodes.js';
import { throwError } from '../helpers/generic.js';

const createArticle = (req, _, next) => {
  const { title, content } = req.body;

  if (!title || !content)
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
  const { action, title, content } = req.body;

  if (!req.params.id)
    throwError('Invalid id param', HTTP_STATUS_CODES.BAD_REQUEST);

  if (!action)
    throwError('"action" is required', HTTP_STATUS_CODES.BAD_REQUEST);

  if (action === 'edit' && (!title || !content)) {
    throwError('title and content is required', HTTP_STATUS_CODES.BAD_REQUEST);
  }

  next();
};

export default {
  createArticle,
  getSingleArticle,
  deleteArticle,
  updateArticle,
};
