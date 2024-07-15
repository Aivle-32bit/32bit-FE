import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, FETCH_USER_INFO_REQUEST, FETCH_USER_INFO_SUCCESS, FETCH_USER_INFO_FAILURE } from '../actions/types';

const storedUserInfo = localStorage.getItem('userInfo');
const initialState = storedUserInfo ? JSON.parse(storedUserInfo) : {
  isAuthenticated: false,
  memberId: null,
  memberName: null,
  state: null,
  isAdmin: false,
  email: null,
  companyName: null,
  imageUrl: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        ...action.payload,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        error: action.payload,
      };
    case LOGOUT:
      return {
        isAuthenticated: false,
        memberId: null,
        memberName: null,
        state: null,
        isAdmin: false,
        email: null,
        companyName: null,
        imageUrl: null,
        loading: false,
        error: null,
      };
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
