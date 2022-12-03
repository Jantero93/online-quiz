import { LOGGER } from './../Common/Logger';
import { dbClient } from './DB';

import {
  questionsTable,
  questionsWrongOptionsTable,
  dbTables
} from '../Common/DatabaseTables';

const createQuestionsTable = async () => {
  const queryQuestionTable = `
    CREATE TABLE IF NOT EXISTS "${questionsTable}" (
    "id" SERIAL NOT NULL,
    "question" VARCHAR(1000) NOT NULL,
    "correct_option" VARCHAR(255) NOT NULL,
    "difficulty" VARCHAR(255) NOT NULL,
    PRIMARY KEY("id")
    )
    `;
  const queryWrongOptionsTable = `
    CREATE TABLE IF NOT EXISTS "${questionsWrongOptionsTable}" (
    "id" SERIAL NOT NULL,
    "wrong_option" VARCHAR(255) NOT NULL,
    "question_id" SERIAL NOT NULL,
    PRIMARY KEY("id"),
    CONSTRAINT fk_question
        FOREIGN KEY (question_id)
            REFERENCES questions(id)
    );
    `;
  await dbClient.query(queryQuestionTable);
  await dbClient.query(queryWrongOptionsTable);
};

export const initTables = async () => {
  if (await tablesExist()) {
    LOGGER.info('Tables exist, skipping tables creation');
    return;
  }

  try {
    await createQuestionsTable();
    LOGGER.info('Initialized tables successfully');
  } catch (error) {
    LOGGER.error('Creating tables failed', error);
  }
};

const tablesExist = async () => {
  const prefixQuery = `SELECT to_regclass('TABLE_NAME')`;

  const tableExists = async (tableName: string) => {
    const response = await dbClient.query(
      prefixQuery.replace('TABLE_NAME', tableName)
    );

    return response.rows[0].to_regclass !== null;
  };

  return (
    await Promise.all(dbTables.map((tableName) => tableExists(tableName)))
  ).every((isTableCreated) => isTableCreated);
};
