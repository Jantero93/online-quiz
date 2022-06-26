import { SetUserLog } from '../reducers/userReducer';

export const setUserLogged = (
  userId: string,
  email: string,
  expires: string
): SetUserLog => ({
  payload: {
    email,
    expires,
    userId,
    isLogged: true
  },
  type: 'SET_USER_LOGGED'
});
