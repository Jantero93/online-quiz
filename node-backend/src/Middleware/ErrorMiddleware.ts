import { NextFunction, Request, Response } from 'express';
import { LOGGER } from '../Common/Logger';
import ResponseError from '../Common/ResponseError';

export const errorLogger = (
  err: ResponseError,
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  LOGGER.error(`Error middleware triggered`);
  LOGGER.error(`Message: ${err.message}`);
  LOGGER.error(`Error type: ${err.errorType}`);
  next(err);
};

export const errorResponser = (
  err: ResponseError,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  LOGGER.error(`Sending error from error middleware`);

  const sendResponse = (message: string, statusCode: number) =>
    res.status(statusCode).send({ error: message });

  switch (err.errorType) {
    case '400BadRequest':
      sendResponse(err.message, 400);
      break;
    case '401Unauthorized':
      sendResponse(err.message, 401);
      break;
    case '402PaymentRequired':
      sendResponse(err.message, 402);
      break;
    case '403Forbidden':
      sendResponse(err.message, 403);
      break;
    case '404NotFound':
      sendResponse(err.message, 404);
      break;
    case '405MethodNotAllowed':
      sendResponse(err.message, 405);
      break;
    case '406NotAcceptable':
      sendResponse(err.message, 406);
      break;
    case '407ProxyAuthenticationRequired':
      sendResponse(err.message, 407);
      break;
    case '408RequestTimeout':
      sendResponse(err.message, 408);
      break;
    case '409Conflict':
      sendResponse(err.message, 409);
      break;
    case '500InternalServerError':
      sendResponse(err.message, 500);
      break;
    default:
      sendResponse('Internal Server Error', 500);
      break;
  }
};
