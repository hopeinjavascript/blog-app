import HTTP_STATUS_CODES from '../constants/httpStatusCodes.js';
import { setResponse, throwError } from '../helpers/generic.js';
import articleServices from '../services/articles.js';
import upload from '../utils/uploadFile.js';

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

const uploadFile = async (req, res, next) => {
  res.serviceName = 'uploadFile';
  try {
    const resp = await upload(req, res);

    if (!resp) throwError('File not uploaded');

    if (resp === 'File not provided')
      throwError(resp, HTTP_STATUS_CODES.BAD_REQUEST);

    setResponse(res)(
      HTTP_STATUS_CODES.SUCCESS,
      'File uploaded successfully',
      resp
    );
    next();
  } catch (error) {
    console.error('uploadFile -', error);
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
  uploadFile,
  getSingleArticle,
  deleteArticle,
  updateArticle,
};
