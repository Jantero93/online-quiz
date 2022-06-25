import express, { Request, Response } from 'express';
import logger from './utils/logger';

import requestLogger from './middleware/requestLogger';

const app = express();

app.use(requestLogger);

app.get('/', (req: Request, res: Response) => {
  logger.info('test');
  res.send('Express + TypeScript Server');
});

export default app;
