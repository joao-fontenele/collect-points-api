import express from 'express';

const app = express();

app.use(express.json());

app.get('/users/', (req, res) => {
  console.log('GET /users');

  res.json([
    { name: 'JP' },
    { name: 'Lili' },
  ]);
});

app.post('/users', (req, res) => {
  console.log('req.body', req.body);

  res.json(req.body);
});

const port = 3333;
app.listen(3333, () => {
  console.log(`listening on port ${port}`);
});
