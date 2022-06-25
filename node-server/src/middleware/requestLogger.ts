import { Request, Response, NextFunction } from 'express';

import logger from '../utils/logger';

const requestLogger = (req: Request, _res: Response, next: NextFunction) => {
  const isParams = Object.keys(req.params).length > 0;

  logger.info(`Method: ${req.method}`);
  logger.info(`Path: ${req.path}`);
  req.body && logger.info(`Body: ${req.body}`);
  isParams && logger.info(`Params: ${req.params}`);

  next();
};

export default requestLogger;
