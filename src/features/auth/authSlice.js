import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { get_member, refreshAccessToken, signin, signout } from '../../api';

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password, rememberMe, autoLogin }, thunkAPI) => {
      try {
        const refreshToken = await signin(email, password);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('autoLogin', autoLogin);

        // 사용자 정보를 가져오는 요청
        const userResponse = await get_member();
        return { ...userResponse, rememberMe, autoLogin, refreshToken, email };
      } catch (error) {
        const errorMessage = error.response && error.response.data
            ? error.response.data.message
            : error.message;
        return thunkAPI.rejectWithValue({ message: errorMessage });
      }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, thunkAPI) => {
      try {
        await signout();
      } catch (error) {
        const errorMessage = error.response && error.response.data
            ? error.response.data.message
            : error.message;
        return thunkAPI.rejectWithValue({ message: errorMessage });
      }
    }
);

export const refreshUserToken = createAsyncThunk(
    'auth/refreshUserToken',
    async (_, thunkAPI) => {
      const refreshToken = localStorage.getItem('refreshToken');
      const email = localStorage.getItem('email');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }
      try {
        await refreshAccessToken(refreshToken);
        const userResponse = await get_member();
        return { ...userResponse, email };
      } catch (error) {
        const errorMessage = error.response && error.response.data
            ? error.response.data.message
            : error.message;
        return thunkAPI.rejectWithValue({ message: errorMessage });
      }
    }
);

const initialState = {
  isLoggedIn: false,
  user: null,
  status: 'idle',
  error: null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  autoLogin: localStorage.getItem('autoLogin') === 'true',
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
      state.user = {
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        state: action.payload.state,
        isAdmin: action.payload.isAdmin,
      };
      state.refreshToken = action.payload.refreshToken;
      state.error = null;
      if (action.payload.rememberMe) {
        localStorage.setItem('email', action.payload.email);
      } else {
        localStorage.removeItem('email');
      }
      localStorage.setItem('autoLogin', action.payload.autoLogin);
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
      state.refreshToken = null;
      state.error = null;
      sessionStorage.removeItem('user');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('autoLogin');
      localStorage.removeItem('email');
    })
    .addCase(logoutUser.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload.message;
    })
    .addCase(refreshUserToken.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(refreshUserToken.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.isLoggedIn = true;
      state.user = {
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        state: action.payload.state,
        isAdmin: action.payload.isAdmin,
      };
      state.error = null;
      sessionStorage.setItem('user', JSON.stringify(state.user));
    })
    .addCase(refreshUserToken.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload.message;
    });
  },
});

export default authSlice.reducer;