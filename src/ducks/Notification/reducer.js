// import {GENERIC_ERROR} from '../../utils/commons';
import {
  REGISTER_DEVICE_TOKEN_FAILED,
  REGISTER_DEVICE_TOKEN_SUCCESS,
  START_REGISTER_DEVICE_TOKEN,
  START_UNREGISTER_DEVICE_TOKEN,
  UNREGISTER_DEVICE_TOKEN_SUCCESS,
  UNREGISTER_DEVICE_TOKEN_FAILED,
} from './actionTypes';

export const INITIAL_STATE = {
  subId: '',
  fcmToken: '',
  loading: false,
  showModal: false,
};

const registerNotification = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_REGISTER_DEVICE_TOKEN:
      return {
        ...state,
        ...action.newState,
      };
    case REGISTER_DEVICE_TOKEN_SUCCESS:
      return {
        ...state,
        subId: action.payload.data.sub,
        loading: false,
      };
    case REGISTER_DEVICE_TOKEN_FAILED:
      return {
        ...state,
        loading: false,
        showModal: true,
        modalMessage: action.payload,
      };
    case START_UNREGISTER_DEVICE_TOKEN:
      return {
        ...state,
        ...action.newState,
      };
    case UNREGISTER_DEVICE_TOKEN_SUCCESS:
      return {
        ...state,
        subId: action.payload.data.sub,
        loading: false,
      };
    case UNREGISTER_DEVICE_TOKEN_FAILED:
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

export default registerNotification;
