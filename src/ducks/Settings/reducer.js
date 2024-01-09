import {
  GET_CUSTOMER_SETTINGS,
  GET_CUSTOMER_SETTINGS_FAILED,
  GET_CUSTOMER_SETTINGS_SUCCESS,
  UPDATE_CUSTOMER_SETTINGS,
  UPDATE_CUSTOMER_SETTINGS_FAILED,
  UPDATE_CUSTOMER_SETTINGS_SUCCESS,
  UPDATE_SETTINGS_STATE,
} from './actionTypes';

export const INITIAL_STATE = {
  loading: false,
  showModal: false,
  modalMessage: '',
  customerSettings: [],
  updatedCustomerSettings: [],
};

const settings = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_SETTINGS_STATE:
      return {
        ...state,
        ...action.newState,
      };
    // Get customer settings
    case GET_CUSTOMER_SETTINGS:
      return {
        ...state,
        ...action.payload,
        loading: true,
      };
    case GET_CUSTOMER_SETTINGS_SUCCESS:
      return {
        ...state,
        customerSettings: action.payload,
        loading: false,
      };
    case GET_CUSTOMER_SETTINGS_FAILED:
      return {
        ...state,
        loading: false,
        showModal: true,
        modalMessage: action.payload,
      };
    // Update customer settings
    case UPDATE_CUSTOMER_SETTINGS:
      return {
        ...state,
        ...action.payload,
        loading: true,
      };
    case UPDATE_CUSTOMER_SETTINGS_SUCCESS:
      return {
        ...state,
        updatedCustomerSettings: action.payload.data,
        loading: false,
      };
    case UPDATE_CUSTOMER_SETTINGS_FAILED:
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

export default settings;
