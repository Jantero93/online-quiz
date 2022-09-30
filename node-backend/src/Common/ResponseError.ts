import { CustomError } from 'ts-custom-error';

type ErrorType =
  | '400BadRequest'
  | '401Unauthorized'
  | '402PaymentRequired'
  | '403Forbidden'
  | '404NotFound'
  | '405MethodNotAllowed'
  | '406NotAcceptable'
  | '407ProxyAuthenticationRequired'
  | '408RequestTimeout'
  | '409Conflict'
  | '500InternalServerError';

export default class ResponseError extends CustomError {
  public constructor(message: string, public errorType: ErrorType) {
    super(message);
  }
}
