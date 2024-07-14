import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    UPDATE_USER_STATUS,
    REMOVE_USER
  } from './types';
  import { axiosInstance } from '../api';
  
  export const fetchUsersRequest = () => ({
    type: FETCH_USERS_REQUEST,
  });
  
  export const fetchUsersSuccess = (users) => ({
    type: FETCH_USERS_SUCCESS,
    payload: users,
  });
  
  export const fetchUsersFailure = (error) => ({
    type: FETCH_USERS_FAILURE,
    payload: error,
  });
  
  export const fetchUsersAsync = () => async (dispatch) => {
    dispatch(fetchUsersRequest());
    try {
      const response = await axiosInstance.get('/users'); // 사용자 목록 API 엔드포인트로 수정
      dispatch(fetchUsersSuccess(response.data));
    } catch (error) {
      dispatch(fetchUsersFailure(error.message));
    }
  };
  
  export const updateUserStatus = (userData) => async (dispatch) => {
    try {
      const response = await axiosInstance.patch(`/users/${userData.id}/status`, userData);
      dispatch({
        type: UPDATE_USER_STATUS,
        payload: response.data,
      });
    } catch (error) {
      console.error('Error updating user status:', error);
      throw error;
    }
  };
  
  export const removeUser = (userId) => async (dispatch) => {
    try {
      await axiosInstance.delete(`/users/${userId}`);
      dispatch({
        type: REMOVE_USER,
        payload: userId,
      });
    } catch (error) {
      console.error('Error removing user:', error);
      throw error;
    }
  };
  