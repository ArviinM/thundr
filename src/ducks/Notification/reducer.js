// import {GENERIC_ERROR} from '../../utils/commons';
import {
  REGISTER_DEVICE_TOKEN_FAILED,
  REGISTER_DEVICE_TOKEN_SUCCESS,
  START_REGISTER_DEVICE_TOKEN,
  START_UNREGISTER_DEVICE_TOKEN,
  UNREGISTER_DEVICE_TOKEN_SUCCESS,
  UNREGISTER_DEVICE_TOKEN_FAILED,
  UPDATE_NOTIFICATION_STATE,
} from './actionTypes';

export const INITIAL_STATE = {
  subId: '',
  fcmToken: '',
  loading: false,
  showModal: false,
  notificationData: {},
};

const notification = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_NOTIFICATION_STATE:
      return {
        ...state,
        ...action.newState,
      };
    case START_REGISTER_DEVICE_TOKEN:
      return {
        ...state,
        ...action.payload,
        loading: true,
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
        ...action.payload,
        loading: true,
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

export default notification;
