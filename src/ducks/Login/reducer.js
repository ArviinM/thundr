import {GENERIC_ERROR_MESSAGE} from '../../utils/commons';
import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  START_LOGIN,
  START_LOGOUT,
  START_LOGOUT_FAILED,
  START_LOGOUT_SUCCESS,
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

const login = (state = INITIAL_STATE, action) => {
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
        loginData: [{data: 'hahaha'}],
        loading: false,
        authenticated: true,
      };
    default:
      return state;
  }
};

export default login;
