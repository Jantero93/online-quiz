import { createLogger, format, transports } from 'winston';

const custom = format.printf((info) => `${info.timestamp} ${info.level}  ${info.message}`);
const logger = createLogger({
  format: format.combine(
    format((info) => {
      info.level = info.level.toUpperCase();
      return info;
    })(),
    format.timestamp({ format: 'HH:mm:ss' }),
    format.colorize(),
    format.splat(),
    format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),
    custom
  ),
  transports: [new transports.Console()]
});

export default logger;
