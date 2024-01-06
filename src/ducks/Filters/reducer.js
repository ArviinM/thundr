import {
  GET_FILTERS,
  GET_FILTERS_FAILED,
  GET_FILTERS_SUCCESS,
  UPDATE_FILTERS,
  UPDATE_FILTERS_FAILED,
  UPDATE_FILTERS_SUCCESS,
  UPDATE_FILTER_STATE,
} from './actionTypes';

export const INITIAL_STATE = {
  loading: false,
  showModal: false,
  modalMessage: '',
  filterDetails: [],
  updatedFilters: [],
};

const filters = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_FILTER_STATE:
      return {
        ...state,
        ...action.newState,
      };
    // Get filter details
    case GET_FILTERS:
      return {
        ...state,
        ...action.payload,
        loading: true,
      };
    case GET_FILTERS_SUCCESS:
      return {
        ...state,
        filterDetails: action.payload,
        loading: false,
      };
    case GET_FILTERS_FAILED:
      return {
        ...state,
        loading: false,
        showModal: true,
        modalMessage: action.payload,
      };
    // Update filters
    case UPDATE_FILTERS:
      return {
        ...state,
        ...action.payload,
        loading: true,
      };
    case UPDATE_FILTERS_SUCCESS:
      return {
        ...state,
        updatedFilters: action.payload.data,
        loading: false,
      };
    case UPDATE_FILTERS_FAILED:
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

export default filters;
