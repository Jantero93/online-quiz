import { dbClient } from '../../DB/DB';
import { Question } from '../../Types/Question';
import { PostQuestion } from '../../Service/QuestionService';
import app from '../../App';
import request from 'supertest';

describe('Question API tests', () => {
  it('Post/Delete new question', async () => {
    const question: PostQuestion = {
      correct_option: 'CORRECT ANSWER',
      difficulty: 'EASY',
      question: 'IS THIS EVEN QUESTION?'
    };
    const res = await request(app).post('/api/question').send(question);
    const dbQuestion = res.body as Question;

    expect(res.statusCode).toEqual(200);
    expect(dbQuestion.id).toBeTruthy();
    expect(dbQuestion.question).toEqual(question.question);
    expect(dbQuestion.correct_option).toEqual(question.correct_option);
    expect(dbQuestion.difficulty).toEqual(question.difficulty);

    const deleteRes = await request(app).delete(
      `/api/question/${dbQuestion.id}`
    );
    expect(deleteRes.statusCode).toEqual(200);
  });
});

/**
 * app creates connect to database
 */
afterAll(async () => {
  await dbClient.end();
});
