import axios from 'axios';

const URL = '/api/user';
const LOGIN_URL = '/login';

export type LoginResponse = {
  access_token: string;
  refresh_token: string;
};

export const createUser = async (
  email: string,
  password: string
): Promise<void> => {
  const user = {
    email,
    password
  };

  await axios.post(URL, user);
};

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const request = await axios.post(LOGIN_URL, { username: email, password });
  return request.data;
};
