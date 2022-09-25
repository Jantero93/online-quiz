import { dbClient } from './DB/DB';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { requestLogger } from './Middleware/RequestLogger';
import { logger as LOGGER } from './Common/Logger';

const app = express();

dbClient.connect();

app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get('/', async (_req: Request, res: Response) => {
  const query = `SELECT NOW() as now`;

  try {
    const response = await dbClient.query(query);
    LOGGER.info(JSON.stringify(response.rows[0]));
  } catch (error) {
    LOGGER.error(error);
  }

  res.send('moro');
});

export default app;
