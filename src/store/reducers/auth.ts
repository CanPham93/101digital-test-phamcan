import { auth } from "../constants/auth";
import { AnyAction } from "redux";

type StateType = {
  loading: boolean;
  error: any;
  isAuthenticated: boolean;
};

const initialState = {
  loading: false,
  error: {},
  isAuthenticated: !!localStorage.getItem("access_token"),
};

export const authReducer = (
  state: StateType = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case auth.LOGIN_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case auth.LOGIN_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action?.payload,
      };
    }
    case auth.LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        error: {},
      };
    }
    case auth.LOGOUT: {
      return {
        ...state,
        isAuthenticated: false,
        error: {},
      };
    }
    default: {
      return state;
    }
  }
};
export { };
