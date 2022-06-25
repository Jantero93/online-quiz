import { Response, Request } from 'express';

import logger from '../utility/logger';

export const root = (req: Request, res: Response) => {
  logger.info('Root controller');
  res.send('Express + TypeScript from controller');
};
