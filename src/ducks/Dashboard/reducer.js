import {
  CUSTOMER_MATCH,
  CUSTOMER_MATCH_FAILED,
  CUSTOMER_MATCH_SUCCESS,
  GET_CUSTOMER_DETAILS,
  GET_CUSTOMER_DETAILS_FAILED,
  GET_CUSTOMER_DETAILS_SUCCESS,
  GET_CUSTOMER_PHOTO,
  GET_CUSTOMER_PHOTO_FAILED,
  GET_CUSTOMER_PHOTO_SUCCESS,
  GET_CUSTOMER_PROFILE,
  GET_CUSTOMER_PROFILE_FAILED,
  GET_CUSTOMER_PROFILE_SUCCESS,
  GET_MATCH_LIST,
  GET_MATCH_LIST_FAILED,
  GET_MATCH_LIST_SUCCESS,
  UPDATE_CURRENT_LOCATION,
  UPDATE_CURRENT_LOCATION_FAILED,
  UPDATE_CURRENT_LOCATION_SUCCESS,
  UPDATE_DASHBOARD_STATE,
} from './actionTypes';

export const INITIAL_STATE = {
  customerDetails: [],
  customerPhoto: [],
  customerProfile: [],
  matchList: [],
  matchProfile: [],
  customerMatchData: [],
  matchLocation: [],
  loading: false,
  showModal: false,
  matchListLoading: false,
  modalMessage: '',
  currentLocation: {
    longitude: 0,
    latatitude: 0,
  },
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
    // GET MATCH LIST
    case GET_MATCH_LIST:
      return {
        ...state,
        ...action.payload,
        matchListLoading: true,
      };
    case GET_MATCH_LIST_SUCCESS:
      return {
        ...state,
        matchList: action.payload,
        matchListLoading: false,
      };
    case GET_MATCH_LIST_FAILED:
      return {
        ...state,
        matchListLoading: false,
        showModal: true,
        modalMessage: action.payload,
      };
    // CUSTOMER MATCH
    case CUSTOMER_MATCH:
      return {
        ...state,
        ...action.payload,
        loading: true,
      };
    case CUSTOMER_MATCH_SUCCESS:
      return {
        ...state,
        customerMatchData: action.payload,
        loading: false,
      };
    case CUSTOMER_MATCH_FAILED:
      return {
        ...state,
        loading: false,
        showModal: true,
        modalMessage: action.payload,
      };
    // UPDATE USER CURRENT LOCATION
    case UPDATE_CURRENT_LOCATION:
      return {
        ...state,
        ...action.payload,
      };
    case UPDATE_CURRENT_LOCATION_SUCCESS:
      return {
        ...state,
        matchLocation: action.payload,
      };
    case UPDATE_CURRENT_LOCATION_FAILED:
      return {
        ...state,
        showModal: true,
        modalMessage: action.payload,
      };
    default:
      return state;
  }
};

export default dashboard;
