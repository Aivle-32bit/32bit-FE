// src/actions/authActions.js
import { SET_USER_INFO } from './authActionTypes';
import { signin } from '../pages/api'; // api.js에서 signin 함수를 가져옵니다

export const setUserInfo = (isAdmin, state) => ({
  type: SET_USER_INFO,
  payload: { isAdmin, state }
});

export const fetchUserInfo = () => async (dispatch) => {
  try {
    // api.js의 signin 함수를 사용하여 로그인 요청을 보냅니다
    const response = await signin('test@example.com', 'password'); // 예시로 이메일과 비밀번호를 넣어 호출
    // 이 부분은 실제 API 응답에 맞게 수정해야 합니다.
    // 예를 들어, response.data.isAdmin, response.data.state 등을 사용할 수 있습니다.
    dispatch(setUserInfo(response.data.isAdmin, response.data.state));
  } catch (error) {
    console.error('Error fetching user info:', error);
  }
};
