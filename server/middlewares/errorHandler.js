import HTTP_STATUS_CODES from '../constants/httpStatusCodes.js';

// user error message (user-friendly) and tech error message (message to DEBUG) should be different
function errorHandler(err, req, res, next) {
  const ERR_OBJ = {
    errorServiceName: res.serviceName,
    success: false,
    errorCode: err.code || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
    errorName: err.name,
    errorMessage: err.message,
    errorStack: err.stack,
    errorData: err.data,
  };

  // log to console
  const logObj = {
    url: req.url,
    params: req.params,
    query: req.query,
    ...ERR_OBJ,
  };

  // console.log(logObj);

  res.status(ERR_OBJ.errorCode).json(ERR_OBJ);
}

export default errorHandler;
