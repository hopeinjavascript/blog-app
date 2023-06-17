import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'home route' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.info(`Server is listening on http://localhost:${PORT}`)
);
