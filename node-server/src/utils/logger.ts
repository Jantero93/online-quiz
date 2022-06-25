import winston from 'winston';

const { colorize, splat, combine, timestamp, printf } = winston.format;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const myFormat = printf(({ timestamp, level, message, meta }) => {
  return `${level} ${message} ${meta ? meta : ''}`;
});

const logger = winston.createLogger({
  format: combine(colorize(), timestamp(), splat(), myFormat),
  transports: [new winston.transports.Console()]
});

export default logger;
