import express from 'express';
import path from 'path';
import itemsRouter from './routes/items';
import pointsRouter from './routes/points';
import cors from 'cors';
import { errors } from 'celebrate';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(itemsRouter);
app.use(pointsRouter);

app.use(errors());

const port = 3333;
app.listen(3333, () => {
  console.log(`listening on port ${port}`);
});
