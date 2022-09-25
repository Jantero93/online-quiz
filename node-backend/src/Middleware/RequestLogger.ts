import { Request, Response, NextFunction } from 'express';
import { LOGGER } from '../Common/Logger';
import { isObjectEmpty } from '../Common/HelperFunctions';

export const requestLogger = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  LOGGER.info(`${new Date().toLocaleTimeString('de-DE')}: Path: ${req.path}`);
  !isObjectEmpty(req.params) && LOGGER.info('Params', req.params);
  !isObjectEmpty(req.body) && LOGGER.info('Body', req.body);
  next();
};
