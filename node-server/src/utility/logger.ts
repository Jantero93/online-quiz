import { createLogger, format, transports } from 'winston';

const custom = format.printf((info) => `${info.level}: ${info.message}`);

const logger = createLogger({
  format: format.combine(
    format((info) => {
      info.level = info.level.toUpperCase();
      return info;
    })(),
    format.colorize(),
    custom
  ),
  transports: [new transports.Console()]
});

export default logger;
