import { SetUserLog } from '../reducers/userReducer';

export const setUserLogged = (
  accessToken: string,
  refreshToken: string,
  isLogged: boolean
): SetUserLog => ({
  payload: {
    accessToken,
    refreshToken,
    isLogged
  },
  type: 'SET_USER_LOGGED'
});
