import express, { Request, Response } from 'express';
import logger from './utils/logger';

const app = express();

app.get('/', (req: Request, res: Response) => {
  logger.info('test');
  res.send('Express + TypeScript Server');
});

export default app;
