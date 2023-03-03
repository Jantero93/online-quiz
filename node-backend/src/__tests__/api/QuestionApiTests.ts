import { dbClient } from '../../DB/DB';
import { QuestionDTO } from '../../Types/Question';
import { PostQuestion } from '../../Service/QuestionService';
import app from '../../App';
import request from 'supertest';

describe('Question API tests', () => {
  it('Post & Delete new Question should return 200', async () => {
    const question: PostQuestion = {
      correct_option: 'CORRECT ANSWER',
      wrong_options: ['wrong1', 'wrong2', 'wrong3'],
      difficulty: 'EASY',
      question: 'IS THIS EVEN QUESTION?'
    };
    const res = await request(app).post('/api/question').send(question);
    const dbQuestion = res.body as QuestionDTO;

    expect(res.statusCode).toEqual(200);
    expect(dbQuestion.id).toBeTruthy();
    expect(dbQuestion.question).toEqual(question.question);
    expect(dbQuestion.correct_option).toEqual(question.correct_option);
    expect(dbQuestion.difficulty).toEqual(question.difficulty);

    const deleteRes = await request(app).delete(`/api/question/${dbQuestion.id}`);

    expect(deleteRes.statusCode).toEqual(200);
  });

  it('Delete Question should return 404', async () => {
    const nullId = -9999;
    const res = await request(app).delete(`/api/question/${nullId}`);
    expect(res.statusCode).toEqual(404);
  });

  it('Get Question should return 200', async () => {
    const testQuestion: PostQuestion = {
      correct_option: 'test_option',
      difficulty: 'test_difficulty',
      wrong_options: ['wrong1', 'wrong2', 'wrong3'],
      question: 'test_question'
    };

    const postRes = await request(app).post('/api/question').send(testQuestion);
    const dbQuestion = postRes.body as QuestionDTO;

    const res = await request(app).get(`/api/question/${dbQuestion.id}`);
    const getQuestion = res.body as QuestionDTO;

    const deleteRes = await request(app).delete(`/api/question/${dbQuestion.id}`).send();

    expect(deleteRes.statusCode).toEqual(200);
    expect(postRes.statusCode).toEqual(200);

    expect(res.statusCode).toEqual(200);
    expect(getQuestion.id).toBeTruthy();
    expect(getQuestion.question).toEqual(testQuestion.question);
    expect(getQuestion.correct_option).toEqual(testQuestion.correct_option);
    expect(getQuestion.difficulty).toEqual(testQuestion.difficulty);
    expect(getQuestion.wrong_options[0]).toEqual(testQuestion.wrong_options[0]);
    expect(getQuestion.wrong_options[1]).toEqual(testQuestion.wrong_options[1]);
    expect(getQuestion.wrong_options[2]).toEqual(testQuestion.wrong_options[2]);
  });

  it('Get Question should return 404', async () => {
    const nullId = -1;
    const res = await request(app).get(`/api/question/${nullId}`);
    expect(res.statusCode).toEqual(404);
  });
});

/**
 * Mocking app creates connect to database
 */
afterAll(async () => {
  await dbClient.end();
});
