export default function requestLogger(req, res, next) {
  console.log(`${req.url}`);
  next();
}
