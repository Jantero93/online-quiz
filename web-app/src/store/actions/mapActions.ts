import { SetUserLog } from './../reducers/userReducer';

export const setUserLogged = (
  isLogged: boolean,
  expires: string,
  email: string
): SetUserLog => ({
  payload: {
    email,
    expires,
    isLogged
  },
  type: 'SET_USER_LOGGED'
});
