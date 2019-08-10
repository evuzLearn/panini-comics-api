export const config = {
  request_delay: +process.env.REQUEST_DELAY,
  drop_db: process.env.DROP_DB === 'true',
  db_url: process.env.DB_URL,
};

export type Config = typeof config;
