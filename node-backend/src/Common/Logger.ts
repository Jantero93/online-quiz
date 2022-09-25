import winston from 'winston';

const IS_NODE_ENV_TEST = process.env.NODE_ENV?.toLowerCase() === 'test';

const winstonLogger = winston.createLogger({
  level: 'info',
  format: winston.format.cli(),
  transports: [new winston.transports.Console()]
});

const info = (...params: unknown[]) => {
  if (!IS_NODE_ENV_TEST) {
    winstonLogger.info(params);
  }
};

const error = (...params: unknown[]) => {
  if (!IS_NODE_ENV_TEST) {
    winstonLogger.error(params);
  }
};

const warning = (...params: unknown[]) => {
  if (!IS_NODE_ENV_TEST) {
    winstonLogger.warning(params);
  }
};

const debug = (...params: unknown[]) => {
  winstonLogger.debug(params);
};

export const LOGGER = {
  info: info,
  warning: warning,
  error: error,
  debug: debug
};
