import winston from 'winston';

const IS_NODE_ENV_TEST = process.env.NODE_ENV?.toLowerCase() === 'test';

const winstonLogger = winston.createLogger({
  level: 'info',
  format: winston.format.cli(),
  transports: [new winston.transports.Console()]
});

const info = (...params: unknown[]) => {
  if (!IS_NODE_ENV_TEST) {
    winstonLogger.info(JSON.stringify(params));
  }
};

const error = (...params: unknown[]) => {
  if (!IS_NODE_ENV_TEST) {
    winstonLogger.error(JSON.stringify(params));
  }
};

const warning = (...params: unknown[]) => {
  if (!IS_NODE_ENV_TEST) {
    winstonLogger.warning(JSON.stringify(params));
  }
};

const debug = (...params: unknown[]) => {
  winstonLogger.debug(JSON.stringify(params));
};

export const LOGGER = {
  info: info,
  warning: warning,
  error: error,
  debug: debug
};
