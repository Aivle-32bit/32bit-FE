// src/actions/userActions.js

// 액션 타입 정의
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const UPDATE_USER_STATUS_SUCCESS = 'UPDATE_USER_STATUS_SUCCESS';
export const REMOVE_USER_SUCCESS = 'REMOVE_USER_SUCCESS';

// 액션 생성자 함수 정의
export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

export const updateUserStatusSuccess = (userId, status) => ({
  type: UPDATE_USER_STATUS_SUCCESS,
  payload: { userId, status },
});

export const removeUserSuccess = (userId) => ({
  type: REMOVE_USER_SUCCESS,
  payload: userId,
});

// 비동기 액션 생성자 함수
export const fetchUsersAsync = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('/users.json'); // 실제 API 호출로 대체
      const data = await response.json();
      dispatch(fetchUsersSuccess(data));
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
};

export const updateUserStatus = ({ id, status }) => {
  return async (dispatch) => {
    try {
      // await members({ id, status: 'dormant' }); // 실제 API 호출로 대체
      dispatch(updateUserStatusSuccess(id, status));
    } catch (error) {
      console.error('Error updating user status:', error);
      throw error;
    }
  };
};

export const removeUser = (userId) => {
  return async (dispatch) => {
    try {
      // await members({ id: userId, status: 'deleted' }); // 실제 API 호출로 대체
      dispatch(removeUserSuccess(userId));
    } catch (error) {
      console.error('Error removing user:', error);
      throw error;
    }
  };
};
