import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './types';
import { signIn } from '../api';

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
      payload: error
    });
  }
};

export const logout = () => ({
  type: LOGOUT
});
