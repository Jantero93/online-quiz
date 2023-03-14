import express, { Express, Request, Response } from 'express';

const app = express();

app.get('/', (_req, res) => res.send('MORON MORO'));

app.listen(8080, () => console.log('looking good'));
