export const ENV = {
  PORT: process.env.PORT || 8080
};

export const DB_ENV = {
  PG_USER: process.env.PG_USER || 'postgres',
  PG_PASSWORD: process.env.PG_PASSWORD || 'admin',
  PG_HOST: process.env.PG_HOST || 'localhost',
  PG_DATABASE: process.env.PG_DATABASE || 'online-quiz',
  PG_PORT: Number(process.env.PG_PORT) || 5432
};
