import { QuestionWrongOption, Question } from './../Types/Question';
import { PostQuestion } from '../Service/QuestionService';
import { dbClient } from '../DB/DB';

import ResponseError from '../Common/ResponseError';
import { LOGGER } from '../Common/Logger';

export const postQuestionDB = async (question: PostQuestion) => {
  LOGGER.info('Posting question to DB:', question);

  const query = `
  INSERT INTO questions(question, correct_option, difficulty)
  VALUES ($1, $2, $3)
  RETURNING *
  `;

  const values = [
    question.question,
    question.correct_option,
    question.difficulty
  ];

  try {
    const dbResponse = await dbClient.query(query, values);
    const response = dbResponse.rows[0] as Question;

    return response;
  } catch (error) {
    throw new ResponseError(
      (error as Error).message || 'Post question db query failed',
      '500InternalServerError'
    );
  }
};

export const postQuestionWrongOptionsDB = async (
  wrongOptions: string[],
  questionId: number
) => {
  LOGGER.info('Posting wrong options to DB:', wrongOptions);
  const query = `
  INSERT INTO questions_wrong_options(wrong_option, question_id)
  VALUES ($1, $2)
  RETURNING *`;

  const dbWrongOptions = await Promise.all(
    wrongOptions.map(async (option) => {
      const response = await dbClient.query(query, [option, questionId]);
      return response.rows[0] as QuestionWrongOption;
    })
  );
  return dbWrongOptions;
};

export const deleteQuestionDB = async (id: number) => {
  LOGGER.info(`Deleting question from database with id ${id}`);

  const deleteQuery = `
  DELETE FROM questions
  WHERE id = $1
  `;

  const isQuestion = await questionExists(id);
  if (!isQuestion)
    throw new ResponseError(`Not found question with id ${id}`, '404NotFound');

  try {
    await dbClient.query(deleteQuery, [id]);
  } catch (error) {
    throw new ResponseError(
      (error as Error).message || 'Delete question db query failed',
      '500InternalServerError'
    );
  }
};

export const deleteWrongOptionsQuestionDB = async (questionId: number) => {
  LOGGER.info(
    `Deleting questions wrong options from database with id ${questionId}`
  );

  const isQuestion = await questionExists(questionId);
  if (!isQuestion)
    throw new ResponseError(
      `Not found question with id ${questionId}`,
      '404NotFound'
    );

  const query = `
  DELETE FROM questions_wrong_options
  WHERE question_id = $1
  `;

  try {
    await dbClient.query(query, [questionId]);
  } catch (error) {
    throw new ResponseError(
      (error as Error).message || 'Delete question db query failed',
      '500InternalServerError'
    );
  }
};

export const getQuestionDB = async (id: number) => {
  LOGGER.info(`Fetching question from DB with id ${id}`);

  const dbResponse = await dbClient.query(
    `SELECT id, question, correct_option, difficulty
    FROM questions
    WHERE id = $1`,
    [id]
  );

  if (!dbResponse.rows.length)
    throw new ResponseError(`Not found question with id ${id}`, '404NotFound');

  return dbResponse.rows[0] as Question;
};

const questionExists = async (id: number) => {
  const dbResponse = await dbClient.query(
    `SELECT id, question, correct_option, difficulty
    FROM questions
    WHERE id = $1`,
    [id]
  );

  return dbResponse.rows.length;
};
