import { errorLogger, errorResponser } from './Middleware/ErrorMiddleware';
import { dbClient } from './DB/DB';
import express from 'express';
import cors from 'cors';
import { requestLogger } from './Middleware/RequestLogger';
import routes from './Routes/index';

dbClient.connect();

const app = express();

app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use('/', routes);

app.use(errorLogger);
app.use(errorResponser);

export default app;
