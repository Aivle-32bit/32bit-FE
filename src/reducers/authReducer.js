import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, FETCH_USER_INFO_REQUEST, FETCH_USER_INFO_SUCCESS, FETCH_USER_INFO_FAILURE } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  isAdmin: false,
  state: null,
  memberName: '',
  memberId: null,
  email: '',
  companyName: '',
  imageUrl: '',
  createdAt: '',
  error: null,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isAdmin: action.payload.isAdmin,
        state: action.payload.state,
        memberName: action.payload.memberName,
        memberId: action.payload.memberId,
        error: null
      };
    case LOGIN_FAILURE:
      return {
        ...state,
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
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case FETCH_USER_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
