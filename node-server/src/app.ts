import express from 'express';

import routes from './routes/indexRoutes';

import requestLogger from './middleware/requestLogger';

const app = express();

app.use(requestLogger);
app.use(routes);

export default app;
