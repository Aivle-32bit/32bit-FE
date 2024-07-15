import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, FETCH_USER_INFO_REQUEST, FETCH_USER_INFO_SUCCESS, FETCH_USER_INFO_FAILURE } from './types';
import { signIn, fetchMyPageInfo } from '../api';

// login 함수 정의를 아래로 이동
export const login = (email, password) => async (dispatch) => {
  try {
    const response = await signIn(email, password);
    const { memberId, memberName, state, isAdmin, email: userEmail, companyName, imageUrl } = response;

    const userInfo = { memberId, memberName, state, isAdmin, email: userEmail, companyName, imageUrl };

    localStorage.setItem('userInfo', JSON.stringify(userInfo)); // 로컬 스토리지에 사용자 정보 저장

    dispatch({
      type: LOGIN_SUCCESS,
      payload: userInfo
    });

    return { type: LOGIN_SUCCESS };
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.message
    });

    return { type: LOGIN_FAILURE };
  }
};

export const logout = (navigate) => (dispatch) => {
  localStorage.removeItem('userInfo'); // 로그아웃 시 로컬 스토리지에서 사용자 정보 제거
  dispatch({ type: LOGOUT });
  navigate('/login'); // 로그아웃 후 리다이렉트
};

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
