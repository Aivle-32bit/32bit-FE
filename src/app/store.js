import {combineReducers} from "redux";
import authReducer from "../features/auth/authSlice";
import storageSession from 'redux-persist/lib/storage/session';
import {configureStore} from "@reduxjs/toolkit";
import {persistReducer} from "redux-persist";

const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['auth']
};

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;