import {GENERIC_ERROR} from '../../utils/commons';
import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  START_LOGIN,
  START_LOGIN_VIA_REFRESH_TOKEN,
  START_LOGIN_VIA_REFRESH_TOKEN_FAILED,
  START_LOGIN_VIA_REFRESH_TOKEN_SUCCESS,
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
  token: null,
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
        token: action.payload.accessToken,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        showModal: true,
        modalMessage: action.payload,
      };
    case START_LOGOUT:
      return {
        ...state,
        authenticated: false,
      };
    case START_LOGIN_VIA_REFRESH_TOKEN:
      return {
        ...state,
        ...action.payload,
        loading: true,
      };
    case START_LOGIN_VIA_REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        loginData: action.payload,
        loading: false,
        authenticated: true,
      };
    case START_LOGIN_VIA_REFRESH_TOKEN_FAILED:
      return {
        ...state,
        loading: false,
        showModal: true,
        modalMessage: action.payload,
      };
    default:
      return state;
  }
};

export default mobileEmail;
