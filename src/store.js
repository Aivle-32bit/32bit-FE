// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer'; // userReducer를 가져옴

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer, // userReducer 추가
  },
});

export default store;
