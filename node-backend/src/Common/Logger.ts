import winston from 'winston';

const IS_NODE_ENV_TEST = process.env.NODE_ENV === 'test';
export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.cli(),
  transports: [new winston.transports.Console()]
});

export const info = (...params: unknown[]) => {
  if (!IS_NODE_ENV_TEST) {
    logger.info(params);
  }
};
export const error = (...params: unknown[]) => {
  if (!IS_NODE_ENV_TEST) {
    logger.error(params);
  }
};

export const warning = (...params: unknown[]) => {
  if (!IS_NODE_ENV_TEST) {
    logger.warn(params);
  }
};

export const debug = (...params: unknown[]) => {
  if (!IS_NODE_ENV_TEST) {
    logger.debug(params);
  }
};

export default { info, error, warning };
