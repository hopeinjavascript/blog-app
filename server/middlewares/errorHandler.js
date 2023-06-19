import HTTP_STATUS_CODES from '../constants/httpStatusCodes.js';

// user error message (user-friendly) and tech error message (message to DEBUG) should be different
function errorHandler(err, req, res, next) {
  const ERR_OBJ = {
    success: false,
    serviceName: res.serviceName || 'Service name not provided!',
    code: err.code || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
    message: err.message || 'Internal Server Error',
    data: err.data || '',
    name: err.name,
    stack: err.stack,
  };

  // log to console
  const logObj = {
    url: req.url,
    params: req.params,
    query: req.query,
    ...ERR_OBJ,
  };

  // console.log(logObj);

  res.status(ERR_OBJ.code).json(ERR_OBJ);
}

export default errorHandler;
