import commentServices from '../services/comments.js';

const getAllComments = async (req, res, next) => {
  res.serviceName = 'getAllComments';
  try {
    await commentServices.getAllComments(req, res);
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const createComment = async (req, res, next) => {
  res.serviceName = 'createComment';
  try {
    await commentServices.createComment(req, res);
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getCommentsByArticle = async (req, res, next) => {
  res.serviceName = 'getCommentsByArticle';
  try {
    await commentServices.getCommentsByArticle(req, res);
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getCommentsByUser = async (req, res, next) => {
  res.serviceName = 'getCommentsByUser';
  try {
    await commentServices.getCommentsByUser(req, res);
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  res.serviceName = 'deleteComment';
  try {
    await commentServices.deleteComment(req, res);
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateComment = async (req, res, next) => {
  res.serviceName = 'updateComment';
  try {
    await commentServices.updateComment(req, res);
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export default {
  getAllComments,
  createComment,
  getCommentsByArticle,
  getCommentsByUser,
  deleteComment,
  updateComment,
};
