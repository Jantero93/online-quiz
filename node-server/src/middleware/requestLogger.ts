import { Request, Response, NextFunction } from 'express';
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';

import logger from '../utility/logger';

@Middleware({ type: 'before' })
class RequestLogger implements ExpressMiddlewareInterface {
  use(request: Request, _response: Response, next: NextFunction) {
    const isParams = Object.keys(request.params).length > 0;

    logger.info(`Method: ${request.method}`);
    logger.info(`Path: ${request.path}`);
    request.body && logger.info(`Body: ${request.body}`);
    isParams && logger.info(`Params: ${request.params}`);

    next();
  }
}

export default RequestLogger;
