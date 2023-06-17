import express from 'express';
const app = express();

import authRouter from './routes/auth.js';

// test route
app.get('/', (req, res) => {
  res.status(200).json({ msg: 'home route' });
});

app.use('/auth', authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.info(`Server is listening on http://localhost:${PORT}`)
);
