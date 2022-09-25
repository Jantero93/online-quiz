import { PostQuestion } from '../Service/QuestionService';
import { dbClient } from '../DB/DB';
import { Question } from '../Types/Question';
import ResponseError from '../Common/ResponseError';

export const postQuestionDB = async (question: PostQuestion) => {
  const query = `
  INSERT INTO questions(question, correct_option, difficulty)
  VALUES ($1, $2, $3)
  RETURNING *
  `;
  const values = [
    question.question,
    question.correctOption,
    question.difficulty
  ];

  try {
    const dbResponse = await dbClient.query(query, values);
    return dbResponse.rows[0] as Question;
  } catch (error) {
    throw new ResponseError(
      (error as Error).message || 'Post question db query failed',
      '500InternalServerError'
    );
  }
};
