import app from './App';
import { CONFIG } from './Config/EnvironmentVariables';
import * as logger from './Common/Logger';
import { createServer } from 'http';

const server = createServer(app);

try {
  server.listen(CONFIG.PORT, () =>
    logger.info(`Connected to port ${CONFIG.PORT}`)
  );
} catch (error) {
  logger.error(error);
}
