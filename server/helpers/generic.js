export function throwError(errMsg, errCode, errData = '') {
  const errObj = new Error(errMsg);
  errObj.code = errCode;
  if (errData) errObj.data = errData;
  // return errObj;
  throw errObj;
}

export function setResponse(res) {
  return function (code, msg, data) {
    res.code = code;
    res.message = msg;
    res.data = data;
  };
}
