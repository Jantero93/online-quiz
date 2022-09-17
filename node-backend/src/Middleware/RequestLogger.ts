import { Request, Response, NextFunction } from 'express';
import Logger from '../Common/Logger';
import { isObjectEmpty } from '../Common/HelperFunctions';

export const requestLogger = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  Logger.info(`${new Date().toLocaleTimeString('de-DE')}: Path: ${req.path}`);
  !isObjectEmpty(req.params) && Logger.info('Params', req.params);
  !isObjectEmpty(req.body) && Logger.info('Body', req.body);
  next();
};
