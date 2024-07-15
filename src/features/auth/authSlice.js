import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signin, signout } from '../../api';

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, thunkAPI) => {
      try {
        const response = await signin(email, password);
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, thunkAPI) => {
      try {
        const response = await signout();
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
);

const initialState = {
  isLoggedIn: false,
  user: null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(loginUser.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.isLoggedIn = true;
      state.user = action.payload;
      state.error = null;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload.message;
    })
    .addCase(logoutUser.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(logoutUser.fulfilled, (state) => {
      state.status = 'succeeded';
      state.isLoggedIn = false;
      state.user = null;
      state.error = null;
      localStorage.removeItem('authState'); // 로컬 스토리지에서 상태 제거
    })
    .addCase(logoutUser.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload.message;
    });
  },
});

export default authSlice.reducer;