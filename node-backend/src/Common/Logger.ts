import winston from 'winston';
import { isObjectOrArray } from './HelperFunctions';
import { ENV } from '../Config/EnvironmentVariables';

const winstonLogger = winston.createLogger({
  level: 'info',
  format: winston.format.cli(),
  transports: [new winston.transports.Console()]
});

const paramToLoggerFormat = (param: unknown) =>
  isObjectOrArray(param) ? JSON.stringify(param) : param;

const info = (...params: unknown[]) =>
  ENV.NODE_ENV !== 'test' &&
  params.forEach((p) => winstonLogger.info(paramToLoggerFormat(p)));

const error = (...params: unknown[]) =>
  ENV.NODE_ENV !== 'test' &&
  params.forEach((p) => winstonLogger.error(paramToLoggerFormat(p)));

const warning = (...params: unknown[]) =>
  ENV.NODE_ENV !== 'test' &&
  params.forEach((p) => winstonLogger.warn(paramToLoggerFormat(p)));

const debug = (...params: unknown[]) =>
  params.forEach((p) => winstonLogger.debug(paramToLoggerFormat(p)));

export const LOGGER = {
  info,
  warning,
  error,
  debug
};
