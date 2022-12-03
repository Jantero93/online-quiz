import {
  QuestionWrongOption,
  Question,
  QuestionDTO
} from './../Types/Question';
import { PostQuestion } from '../Service/QuestionService';
import { dbClient } from '../DB/DB';

import ResponseError from '../Common/ResponseError';
import { LOGGER } from '../Common/Logger';
import QuestionMapper from '../Common/Mapper/QuestionMapper';

const postQuestion = async (question: PostQuestion): Promise<QuestionDTO> => {
  LOGGER.info('Posting question to DB:', question);

  const queryQuestion = `
  INSERT INTO questions(question, correct_option, difficulty)
  VALUES ($1, $2, $3)
  RETURNING *
  `;

  LOGGER.info('Posting wrong options to DB:', question.wrong_options);
  const queryOptions = `
  INSERT INTO questions_wrong_options(wrong_option, question_id)
  VALUES ($1, $2)
  RETURNING *
  `;

  const values = [
    question.question,
    question.correct_option,
    question.difficulty
  ];

  try {
    // Post question
    const dbResponse = await dbClient.query(queryQuestion, values);
    const questionDb = dbResponse.rows[0] as Question;

    // Post wrong options
    const wrongOptionDbList = await Promise.all(
      question.wrong_options.map(async (option) => {
        const dbResponseWrongOption = await dbClient.query(queryOptions, [
          option,
          questionDb.id
        ]);

        return dbResponseWrongOption.rows[0] as QuestionWrongOption;
      })
    );

    return QuestionMapper.mapQuestionToDto(questionDb, wrongOptionDbList);
  } catch (error) {
    LOGGER.error((error as Error).message);
    throw new ResponseError(
      (error as Error).message || 'Post question db query failed',
      '500InternalServerError'
    );
  }
};

const deleteQuestion = async (id: number): Promise<void> => {
  LOGGER.info(`Deleting questions wrong options from database with id ${id}`);

  const isQuestion = await questionExists(id);
  if (!isQuestion) {
    throw new ResponseError(`Not found question with id ${id}`, '404NotFound');
  }

  const deleteQueryOptions = `
  DELETE FROM questions_wrong_options
  WHERE question_id = $1
  `;

  try {
    await dbClient.query(deleteQueryOptions, [id]);
  } catch (error) {
    LOGGER.error((error as Error).message);
    throw new ResponseError(
      (error as Error).message || 'Delete question db query failed',
      '500InternalServerError'
    );
  }

  LOGGER.info(`Deleting question from database with id ${id}`);

  const deleteQueryQuestion = `
    DELETE FROM questions
    WHERE id = $1
    `;

  try {
    await dbClient.query(deleteQueryQuestion, [id]);
  } catch (error) {
    LOGGER.error((error as Error).message);
    throw new ResponseError(
      (error as Error).message || 'Delete question db query failed',
      '500InternalServerError'
    );
  }
};

const getQuestion = async (id: number): Promise<QuestionDTO> => {
  LOGGER.info(`Fetching question from DB with id ${id}`);

  const isExisting = await questionExists(id);
  if (!isExisting) {
    LOGGER.error(`Not found question with id ${id}`);
    throw new ResponseError(`Not found question with id ${id}`, '404NotFound');
  }

  const dbResponseQuestion = await dbClient.query(
    `
    SELECT id, question, correct_option, difficulty
    FROM questions
    WHERE id = $1
    `,
    [id]
  );

  const questionDb = dbResponseQuestion.rows[0] as Question;

  const dbResponseOptions = await dbClient.query(
    `
    SELECT id, wrong_option, question_id
    FROM questions_wrong_options
    WHERE question_id = $1
    `,
    [id]
  );

  if (!dbResponseOptions.rowCount) {
    LOGGER.error(`Not found question wrong options with question id ${id}`);
    throw new ResponseError(
      `Not found question wrong options with question id ${id}`,
      '404NotFound'
    );
  }

  const wrongOptionsDb = [
    dbResponseOptions.rows[0],
    dbResponseOptions.rows[1],
    dbResponseOptions.rows[2]
  ] as QuestionWrongOption[];

  return QuestionMapper.mapQuestionToDto(questionDb, wrongOptionsDb);
};

const questionExists = async (id: number): Promise<boolean> => {
  const dbResponse = await dbClient.query(
    `
    SELECT id, question, correct_option, difficulty
    FROM questions
    WHERE id = $1
    `,
    [id]
  );

  return dbResponse.rows.length !== 0;
};

export default {
  postQuestion,
  deleteQuestion,
  getQuestion
};
