import express from 'express';
import path from 'path';

const app = express();

app.use(express.json());

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

const port = 3333;
app.listen(3333, () => {
  console.log(`listening on port ${port}`);
});
