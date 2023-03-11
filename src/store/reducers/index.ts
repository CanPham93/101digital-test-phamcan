import { combineReducers } from "redux";
import { messageReducer } from "./message";
import { authReducer } from "./auth";
import { userReducer } from './user';

const rootReducer = combineReducers({
  messages: messageReducer,
  auth: authReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
