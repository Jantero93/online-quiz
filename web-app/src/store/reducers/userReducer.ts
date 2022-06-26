export interface UserState {
  isLogged: boolean;
  email: string;
  expires: string;
}

const initialState: UserState = {
  isLogged: false,
  email: '',
  expires: ''
};

export type SetUserLog = {
  type: 'SET_USER_LOGGED';
  payload: UserState;
};

export type UserActions = SetUserLog;

export const userReducer = (
  state: UserState = initialState,
  action: UserActions
): UserState => {
  switch (action.type) {
    case 'SET_USER_LOGGED': {
      return action.payload;
    }

    default:
      return state;
  }
};
