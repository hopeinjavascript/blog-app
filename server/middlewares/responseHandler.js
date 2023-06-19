import HTTP_STATUS_CODES from '../constants/httpStatusCodes.js';

function responseHandler(req, res, next) {
  const RESP_OBJ = {
    success: true,
    serviceName: res.serviceName || 'Service name not provided!',
    code: res.code || HTTP_STATUS_CODES.SUCCESS,
    message: res.message || 'Success',
    data: res.data || '',
  };

  // log to console
  const logObj = {
    url: req.url,
    params: req.params,
    query: req.query,
    ...RESP_OBJ,
  };

  // console.log(logObj);

  res.status(RESP_OBJ.code).json(RESP_OBJ);
}

export default responseHandler;
