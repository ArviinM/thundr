import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  START_LOGIN,
  START_LOGOUT,
  UPDATE_LOGIN_STATE,
} from './actionTypes';

export const INITIAL_STATE = {
  authenticated: false,
  token: '',
  loading: false,
  loginData: [],
  email: '',
  password: '',
  showModal: false,
  modalMessage: '',
};

const mobileEmail = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_LOGIN_STATE:
      return {
        ...state,
        ...action.newState,
      };
    case START_LOGIN:
      return {
        ...state,
        ...action.payload,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginData: action.payload,
        loading: false,
        authenticated: true,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
      };
    case START_LOGOUT:
      return {
        ...state,
        authenticated: false,
      };
    default:
      return state;
  }
};

export default mobileEmail;
