import { user } from '../constants/user';
import { AnyAction } from 'redux';

type StateType = {
  data: any;
};

const initialState = {
  data: {},
};

export const userReducer = (
  state: StateType = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case user.GET_USER_PROFILE: {
      return {
        ...state,
        data: action.payload,
      }
    }
    case user.DELETE_USER_PROFILE: {
      return {
        ...state,
        data: {},
      }
    }
    default: {
      return state;
    }
  }
};
