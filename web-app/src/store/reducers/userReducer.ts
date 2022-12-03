export interface UserState {
  nickname?: string;
  gameId?: string;
}

const initialState: UserState = {
  nickname: undefined,
  gameId: undefined
};

export type SetUserInfo = {
  type: 'SET_USER_INFO';
  payload: UserState;
};

export type UserActions = SetUserInfo;

export const userReducer = (
  state: UserState = initialState,
  action: UserActions
): UserState => {
  switch (action.type) {
    case 'SET_USER_INFO': {
      return action.payload;
    }

    default:
      return state;
  }
};
