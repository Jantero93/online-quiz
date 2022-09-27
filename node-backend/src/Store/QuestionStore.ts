import { PostQuestion } from '../Service/QuestionService';
import { dbClient } from '../DB/DB';
import { Question } from '../Types/Question';
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
    const response = dbResponse.rows[0];

    return response as Question;
  } catch (error) {
    throw new ResponseError(
      (error as Error).message || 'Post question db query failed',
      '500InternalServerError'
    );
  }
};

export const deleteQuestionDB = async (id: number) => {
  LOGGER.info(`Deleting question from database with id ${id}`);

  const dbResponse = await dbClient.query(
    `SELECT id, question, correct_option, difficulty
    FROM questions
    WHERE id = $1`,
    [id]
  );

  if (!dbResponse.rows.length)
    throw new ResponseError(`Not found question with id ${id}`, '404NotFound');

  const deleteQuery = `
  DELETE FROM questions
  WHERE id = $1
  `;

  try {
    await dbClient.query(deleteQuery, [id]);
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
