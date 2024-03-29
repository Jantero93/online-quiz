import { createServer } from 'http';
import app from './App';

import { initTables } from './DB/CreateTable';

import { ENV } from './Config/EnvironmentVariables';
import LOGGER from './Common/Logger';

const server = createServer(app);

try {
  server.listen(ENV.PORT, async () => {
    LOGGER.info(`Connected to port ${ENV.PORT}`);
    LOGGER.info(`Creating database tables`);
    await initTables();
  });
} catch (error) {
  LOGGER.error(error);
}
