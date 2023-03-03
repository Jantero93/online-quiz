const getNODE_ENV = () => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === 'production' || NODE_ENV === 'development' || NODE_ENV === 'test') {
    return NODE_ENV;
  }

  throw new Error('No valid environment variable NODE_ENV');
};

export const ENV = {
  PORT: process.env.PORT || 8080,
  NODE_ENV: getNODE_ENV()
};

export const DB_ENV = {
  PG_USER: process.env.PG_USER || 'postgres',
  PG_PASSWORD: process.env.PG_PASSWORD || 'admin',
  PG_HOST: process.env.PG_HOST || 'localhost',
  PG_DATABASE: process.env.PG_DATABASE || 'online-quiz',
  PG_PORT: Number(process.env.PG_PORT) || 5432
};
