import app from './App';
import { ENV } from './Config/EnvironmentVariables';
import * as logger from './Common/Logger';
import { createServer } from 'http';

const server = createServer(app);

try {
  server.listen(ENV.PORT, () => logger.info(`Connected to port ${ENV.PORT}`));
} catch (error) {
  logger.error(error);
}
