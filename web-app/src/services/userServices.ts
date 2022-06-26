import axios from 'axios';

import { User } from '../types/user';

const URL = '/api/user';

export const createUser = async (
  email: string,
  password: string
): Promise<string> => {
  const user = {
    email,
    password
  };

  const request = await axios.post(URL, user);
  return (request.data as User).email;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<string> => {
  const user = {
    email,
    password
  };

  const request = await axios.post(`${URL}/login`, user);
  return request.data.expires;
};
