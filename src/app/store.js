import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';

// 로컬 스토리지에서 상태를 복원
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('authState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Could not load state', error);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('authState', serializedState);
  } catch (error) {
    console.error('Could not save state', error);
  }
};

const persistedState = loadState();

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: {
    auth: persistedState,
  },
});

// 상태를 로컬 스토리지에 저장
store.subscribe(() => {
  saveState(store.getState().auth);
});

export default store;