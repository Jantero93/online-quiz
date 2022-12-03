import { SetUserInfo } from '../reducers/userReducer';

export const setUserInfo = (gameId: string, nickname: string): SetUserInfo => ({
  type: 'SET_USER_INFO',
  payload: {
    gameId,
    nickname
  }
});
