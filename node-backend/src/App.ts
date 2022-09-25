import { errorLogger, errorResponser } from './Middleware/ErrorMiddleware';
import { dbClient } from './DB/DB';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { requestLogger } from './Middleware/RequestLogger';
import { LOGGER } from './Common/Logger';
import ResponseError from './Common/ResponseError';

dbClient.connect();

const app = express();

app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  const query = `SELECT NOW() as now`;

  try {
    const response = await dbClient.query(query);
    LOGGER.info(JSON.stringify(response.rows[0]));
    throw new ResponseError('test', '500InternalServerError');
  } catch (error) {
    next(error);
  }
});

app.use(errorLogger);
app.use(errorResponser);

export default app;
