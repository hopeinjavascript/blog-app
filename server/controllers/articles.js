import articleServices from '../services/articles.js';

const getAllArticles = async (req, res, next) => {
  res.serviceName = 'getAllArticles';
  try {
    await articleServices.getAllArticles(req, res);
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const createArticle = async (req, res, next) => {
  res.serviceName = 'createArticle';
  try {
    await articleServices.createArticle(req, res);
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getSingleArticle = async (req, res, next) => {
  res.serviceName = 'getSingleArticle';
  try {
    await articleServices.getSingleArticle(req, res);
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const deleteArticle = async (req, res, next) => {
  res.serviceName = 'deleteArticle';
  try {
    await articleServices.deleteArticle(req, res);
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateArticle = async (req, res, next) => {
  res.serviceName = 'updateArticle';
  try {
    await articleServices.updateArticle(req, res);
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export default {
  getAllArticles,
  createArticle,
  getSingleArticle,
  deleteArticle,
  updateArticle,
};
