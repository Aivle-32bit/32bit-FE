import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, FETCH_USER_INFO_REQUEST, FETCH_USER_INFO_SUCCESS, FETCH_USER_INFO_FAILURE } from './types';
import { signIn, fetchMyPageInfo, logout as apiLogout } from '../api';

// 로그인 액션
export const login = (email, password) => async (dispatch) => {
  try {
    const response = await signIn(email, password);
    const { memberId, memberName, state, isAdmin } = response;

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { memberId, memberName, state, isAdmin }
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.message
    });
  }
};

// 로그아웃 액션
export const logout = (navigate) => async (dispatch) => {
  try {
    await apiLogout(navigate);
    dispatch({ type: LOGOUT });
  } catch (error) {
    console.error('Error during logout:', error);
    // 필요 시 추가 에러 처리 로직
  }
};

// 사용자 정보 가져오기 액션
export const fetchUserInfo = () => async (dispatch) => {
  dispatch({ type: FETCH_USER_INFO_REQUEST });

  try {
    const response = await fetchMyPageInfo();
    dispatch({
      type: FETCH_USER_INFO_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: FETCH_USER_INFO_FAILURE,
      payload: error.message,
    });
  }
};
