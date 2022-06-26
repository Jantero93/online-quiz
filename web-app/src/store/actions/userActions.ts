import { SetUserLog } from '../reducers/userReducer';

export const setUserLogged = (email: string, expires: string): SetUserLog => ({
  payload: {
    email,
    expires,
    isLogged: true
  },
  type: 'SET_USER_LOGGED'
});
