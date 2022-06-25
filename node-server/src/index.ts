import { createServer } from 'http';

import logger from './utils/logger';

import config from './config/config';

import app from './app';

const server = createServer(app);

try {
  server.listen(config.PORT, () => logger.info(`Connected successfully on port ${config.PORT}`));
} catch (error) {
  logger.error(error);
}
