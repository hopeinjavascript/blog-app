// import dotenv from 'dotenv';
// dotenv.config({});
import 'dotenv/config';
console.log(process.env.MONGO_URI);

import express from 'express';
const app = express();

import cors from 'cors';

import authRouter from './routes/auth.js';
import articlesRouter from './routes/articles.js';

import responseHandler from './middlewares/responseHandler.js';
import errorHandler from './middlewares/errorHandler.js';
import initDB from './connections/mongoose.js';

import requestLogger from './middlewares/requestLogger.js';

// test route
app.get('/', (req, res) => {
  res.status(200).json({ msg: 'home route' });
});

app.use(cors());
app.use(express.json());
app.use(express.static('images')); //http://localhost:5000/default/avatar.jpg
app.use(requestLogger);
app.use('/auth', authRouter);
app.use('/blogs', articlesRouter);
app.use(responseHandler);
app.use(errorHandler);

export function startServer(app) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`Server is listening on http://localhost:${PORT}`)
  );
}

initDB(
  () => startServer(app) // will start server as well once database is connected!
);

// Using a single function to handle multiple signals
function handle(signal) {
  console.info(`[SIGNAL] Received ${signal}`);
}

process.on('uncaughtException', handle);

process.on('SIGINT', handle);
process.on('SIGTERM', handle);
