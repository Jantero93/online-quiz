import express from 'express';
import env from './src/utils/env';

const app = express();

app.get('/', (_req, res) => res.send('MORON MORO'));

app.listen(env.PORT, () => console.log(`App listening on ${env.PORT}`));
