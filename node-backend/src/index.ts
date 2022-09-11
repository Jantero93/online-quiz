import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';

import { CONFIG } from './Config/EnvironmentVariables';
import * as logger from './Common/Logger';

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Healthy');
});

app.listen(CONFIG.PORT, () => {
  logger.info(`Server is running on PORT ${CONFIG.PORT}`);
});
