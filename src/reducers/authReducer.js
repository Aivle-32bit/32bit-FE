import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, FETCH_USER_INFO_REQUEST, FETCH_USER_INFO_SUCCESS, FETCH_USER_INFO_FAILURE } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  memberId: null,
  memberName: null,
  state: null,
  isAdmin: false,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        memberId: action.payload.memberId,
        memberName: action.payload.memberName,
        state: action.payload.state,
        isAdmin: action.payload.isAdmin,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        error: action.payload,
      };
    case LOGOUT:
      return initialState;
    case FETCH_USER_INFO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_INFO_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    case FETCH_USER_INFO_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
