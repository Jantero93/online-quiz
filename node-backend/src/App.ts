import express, { Request, Response } from 'express';
import cors from 'cors';
import { requestLogger } from './Middleware/RequestLogger';

const app = express();

app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get('/', (_req: Request, res: Response) => {
  res.send('Healthy');
});

export default app;
