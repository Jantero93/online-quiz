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

const deleteQuestion = async (id: number): Promise<void> => {
  LOGGER.info(`Deleting questions wrong options from database with id ${id}`);

  const isQuestion = await questionExists(id);
  if (!isQuestion) {
    throw new ResponseError(`Not found question with id ${id}`, '404NotFound');
  }

  try {
    await dbClient.query(
      `
    DELETE FROM questions_wrong_options
    WHERE question_id = $1
    `,
      [id]
    );
  } catch (error) {
    LOGGER.error((error as Error).message);
    throw new ResponseError(
      (error as Error).message || 'Delete question db query failed',
      '500InternalServerError'
    );
  }

  LOGGER.info(`Deleting question from database with id ${id}`);

  try {
    await dbClient.query(
      `
    DELETE FROM questions
    WHERE id = $1
    `,
      [id]
    );
  } catch (error) {
    LOGGER.error((error as Error).message);
    throw new ResponseError(
      (error as Error).message || 'Delete question db query failed',
      '500InternalServerError'
    );
  }
};

const getAllQuestions = async () => {
  LOGGER.info('Getting all questiong from database');

  try {
    const dbResponseQuestions = await dbClient.query(`
    SELECT id, question, correct_option, difficulty
    FROM questions
    `);

    const dbResponseWrongOptions = await dbClient.query(`
    SELECT id, wrong_option, question_id
    FROM questions_wrong_options
    `);

    const questions = dbResponseQuestions.rows as Question[];
    const wrongOptions = dbResponseWrongOptions.rows as QuestionWrongOption[];

    const mappedQuestions = questions.map((question) => {
      const options = wrongOptions.filter((o) => o.question_id !== question.id);
      return QuestionMapper.mapQuestionToDto(question, options);
    });

    return mappedQuestions;
  } catch (error) {
    LOGGER.error('Failed to fetch every question with options from database');

    throw new ResponseError(
      'Failed to fetch every question with options from database',
      '500InternalServerError'
    );
  }
};

const getQuestion = async (id: number): Promise<QuestionDTO> => {
  LOGGER.info(`Fetching question from DB with id ${id}`);

  const isExisting = await questionExists(id);
  if (!isExisting) {
    LOGGER.warning(`Not found question with id ${id}`);
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
    LOGGER.warning(`Not found question wrong options with question id ${id}`);
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

const postQuestion = async (question: PostQuestion): Promise<QuestionDTO> => {
  const values = [
    question.question,
    question.correct_option,
    question.difficulty
  ];

  try {
    LOGGER.info('Posting question to DB:', question);

    // Post question
    const dbResponse = await dbClient.query(
      `
    INSERT INTO questions(question, correct_option, difficulty)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
      values
    );
    const questionDb = dbResponse.rows[0] as Question;

    LOGGER.info('Posting wrong options to DB:', question.wrong_options);

    // Post wrong options
    const wrongOptionDbList = await Promise.all(
      question.wrong_options.map(async (option) => {
        const dbResponseWrongOption = await dbClient.query(
          `
        INSERT INTO questions_wrong_options(wrong_option, question_id)
        VALUES ($1, $2)
        RETURNING *
        `,
          [option, questionDb.id]
        );

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

/** UTILITY FUNCTIONS */
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
  deleteQuestion,
  getAllQuestions,
  getQuestion,
  postQuestion
};
