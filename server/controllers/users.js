import HTTP_STATUS_CODES from '../constants/httpStatusCodes.js';
import { setResponse, throwError } from '../helpers/generic.js';
import userServices from '../services/users.js';
import upload from '../utils/uploadFile.js';

const getAllUsers = async (req, res, next) => {
  res.serviceName = 'getAllUsers';
  try {
    await userServices.getAllUsers(req, res);
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

//articles written by user
const getAllArticlesByUserId = async (req, res, next) => {
  res.serviceName = 'getAllArticlesByUserId';
  try {
    await userServices.getAllArticlesByUserId(req, res);
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getAllArticlesSavedByUserId = async (req, res, next) => {
  res.serviceName = 'getAllArticlesSavedByUserId';
  try {
    await userServices.getAllArticlesSavedByUserId(req, res);
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

const getSingleUser = async (req, res, next) => {
  res.serviceName = 'getSingleUser';
  try {
    await userServices.getSingleUser(req, res);
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  res.serviceName = 'deleteUser';
  try {
    await userServices.deleteUser(req, res);
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  res.serviceName = 'updateUser';
  try {
    await userServices.updateUser(req, res);
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export default {
  getAllUsers,
  getAllArticlesByUserId,
  getAllArticlesSavedByUserId,
  uploadFile,
  getSingleUser,
  deleteUser,
  updateUser,
};
