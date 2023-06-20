export default function requestLogger(req, res, next) {
  // console.log(`${req.url}`);
  console.log(`[REQUEST PAYLOAD] - `, {
    url: req.url,
    method: req.method,
    params: req.params,
    query: req.query,
  });
  next();
}
