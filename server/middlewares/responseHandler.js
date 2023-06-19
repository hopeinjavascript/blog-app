import HTTP_STATUS_CODES from '../constants/httpStatusCodes.js';

function responseHandler(req, res, next) {
  const RESP_OBJ = {
    serviceName: res.serviceName || 'Service name not provided!',
    success: true,
    respCode: res.code || HTTP_STATUS_CODES.SUCCESS,
    respMessage: res.message || 'Success',
    respData: res.data || '',
  };

  // log to console
  const logObj = {
    url: req.url,
    params: req.params,
    query: req.query,
    ...RESP_OBJ,
  };

  // console.log(logObj);

  res.status(RESP_OBJ.respCode).json(RESP_OBJ);
}

export default responseHandler;
