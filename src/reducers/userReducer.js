// src/reducers/userReducer.js

import { FETCH_USERS_SUCCESS, UPDATE_USER_STATUS_SUCCESS, REMOVE_USER_SUCCESS } from '../actions/userActions';

const initialState = {
  users: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    case UPDATE_USER_STATUS_SUCCESS:
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload.userId ? { ...user, status: action.payload.status } : user
        ),
      };
    case REMOVE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
      };
    default:
      return state;
  }
};

export default userReducer;
