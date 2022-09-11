import { Question } from './../types/question';
import axios from 'axios';

const URL = '/api/question';

export type PostQuestion = Omit<Question, 'userCreated'>;

export const postQuestion = async (
  question: PostQuestion
): Promise<Question> => {
  const request = await axios.post(URL, question);
  return request.data;
};
