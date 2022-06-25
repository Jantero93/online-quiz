import { createServer } from 'http';

import logger from './utils/logger';

import app from './app';

const server = createServer(app);

try {
  server.listen(8080, () => logger.info(`Connected successfully on port ${8080}`));
} catch (error) {
  logger.error(error);
}
