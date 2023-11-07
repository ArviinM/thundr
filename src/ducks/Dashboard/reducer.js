import {
  GET_CUSTOMER_DETAILS,
  GET_CUSTOMER_DETAILS_FAILED,
  GET_CUSTOMER_DETAILS_SUCCESS,
  GET_CUSTOMER_PHOTO,
  GET_CUSTOMER_PHOTO_FAILED,
  GET_CUSTOMER_PHOTO_SUCCESS,
  GET_CUSTOMER_PROFILE,
  GET_CUSTOMER_PROFILE_FAILED,
  GET_CUSTOMER_PROFILE_SUCCESS,
  UPDATE_DASHBOARD_STATE,
} from './actionTypes';

export const INITIAL_STATE = {
  customerDetails: [],
  customerPhoto: [],
  customerProfile: [],
  loading: false,
  showModal: false,
  modalMessage: '',
};

const dashboard = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_DASHBOARD_STATE:
      return {
        ...state,
        ...action.newState,
      };
    // GET CUSTOMER DETAILS
    case GET_CUSTOMER_DETAILS:
      return {
        ...state,
        ...action.payload,
        loading: true,
      };
    case GET_CUSTOMER_DETAILS_SUCCESS:
      return {
        ...state,
        customerDetails: action.payload,
        loading: false,
      };
    case GET_CUSTOMER_DETAILS_FAILED:
      return {
        ...state,
        loading: false,
        showModal: true,
        modalMessage: action.payload,
      };
    // GET CUSTOMER PHOTO
    case GET_CUSTOMER_PHOTO:
      return {
        ...state,
        ...action.payload,
        loading: true,
      };
    case GET_CUSTOMER_PHOTO_SUCCESS:
      return {
        ...state,
        customerPhoto: action.payload,
        loading: false,
      };
    case GET_CUSTOMER_PHOTO_FAILED:
      return {
        ...state,
        loading: false,
        showModal: true,
        modalMessage: action.payload,
      };
    // GET CUSTOMER PROFILE
    case GET_CUSTOMER_PROFILE:
      return {
        ...state,
        ...action.payload,
        loading: true,
      };
    case GET_CUSTOMER_PROFILE_SUCCESS:
      return {
        ...state,
        customerProfile: action.payload,
        loading: false,
      };
    case GET_CUSTOMER_PROFILE_FAILED:
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

export default dashboard;
