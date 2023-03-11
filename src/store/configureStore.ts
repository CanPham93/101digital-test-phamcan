import { persistStore, persistReducer } from "redux-persist";
import { configureStore } from '@reduxjs/toolkit';
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import rootReducer, { RootState } from "./reducers";

const persistConfig = {
  key: "root",
  storage: storage,
};

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

export const asyncDispatch = (dispatch: (arg0: any) => void, callback: any) => {
  return new Promise<void>((resolve) => {
    dispatch(callback);
    resolve();
  })
}

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
});

export const persistor = persistStore(store);