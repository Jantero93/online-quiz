import { Question } from './../types/question';
import axios from 'axios';

const URL = '/api/question';

export const postQuestion = async (
  question: Partial<Question>
): Promise<Question> => {
  const request = await axios.post(URL, question);
  return request.data;
};
