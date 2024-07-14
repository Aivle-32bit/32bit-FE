import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  isAdmin: false,
  state: null,
  memberName: '',
  memberId: null,
  error: null,
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
    default:
      return state;
  }
};

export default authReducer;
