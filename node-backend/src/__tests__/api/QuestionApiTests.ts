import { dbClient } from '../../DB/DB';
import { Question } from '../../Types/Question';
import { PostQuestion } from '../../Service/QuestionService';
import app from '../../App';
import request from 'supertest';

describe('Question API tests', () => {
  it('Post/Delete new Question should return 200', async () => {
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

  it('Delete Question should return 404', async () => {
    const nullId = -9999;
    const res = await request(app).delete(`/api/question/${nullId}`).send();
    expect(res.statusCode).toEqual(404);
  });

  it('Get Question should return 200', async () => {
    const testQuestion: PostQuestion = {
      correct_option: 'test_option',
      difficulty: 'test_difficulty',
      question: 'test_question'
    };

    const postRes = await request(app).post('/api/question').send(testQuestion);
    const dbQuestion = postRes.body as Question;

    const res = await request(app).get(`/api/question/${dbQuestion.id}`).send();
    const getQuestion = res.body as Question;

    const deleteRes = await request(app)
      .delete(`/api/question/${dbQuestion.id}`)
      .send();

    expect(deleteRes.statusCode).toEqual(200);
    expect(postRes.statusCode).toEqual(200);

    expect(res.statusCode).toEqual(200);
    expect(getQuestion.id).toBeTruthy();
    expect(getQuestion.question).toEqual(testQuestion.question);
    expect(getQuestion.correct_option).toEqual(testQuestion.correct_option);
    expect(getQuestion.difficulty).toEqual(testQuestion.difficulty);
  });

  it('Get Question should return 404', async () => {
    const nullId = -1;
    const res = await request(app).get(`/api/question/${nullId}`).send();
    expect(res.statusCode).toEqual(404);
  });
});

/**
 * app creates connect to database
 */
afterAll(async () => {
  await dbClient.end();
});
