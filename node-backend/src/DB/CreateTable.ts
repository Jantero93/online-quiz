import { LOGGER } from './../Common/Logger';
import { dbClient } from './DB';

const createQuestionsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS "questions" (
    "id" SERIAL NOT NULL,
    "question" VARCHAR(1000) NOT NULL UNIQUE,
    "correct_option" VARCHAR(255) NOT NULL,
    "difficulty" VARCHAR(255) NOT NULL,
    PRIMARY KEY("id")
    )
    `;
  await dbClient.query(query);
};

export const initTables = async () => {
  try {
    await createQuestionsTable();
  } catch (error) {
    LOGGER.error('Creating tables failed', error);
  }
};
