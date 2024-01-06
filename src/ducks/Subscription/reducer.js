import {GENERIC_ERROR} from '../../utils/commons';
import {
  GET_SUBSCRIPTION_DETAILS,
  GET_SUBSCRIPTION_DETAILS_FAILED,
  GET_SUBSCRIPTION_DETAILS_SUCCESS,
  UPDATE_SUBSCRIPTION_STATE,
} from './actionTypes';

export const INITIAL_STATE = {
  loading: false,
  ssoValidationData: [],
  showModal: false,
  modalMessage: '',
  subscriptionDetails: [],
};

const subscription = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_SUBSCRIPTION_STATE:
      return {
        ...state,
        ...action.newState,
      };
    // MOBILE VALIDATION
    case GET_SUBSCRIPTION_DETAILS:
      return {
        ...state,
        ...action.payload,
        loading: true,
      };
    case GET_SUBSCRIPTION_DETAILS_SUCCESS:
      return {
        ...state,
        subscriptionDetails: action.payload,
        loading: false,
      };
    case GET_SUBSCRIPTION_DETAILS_FAILED:
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

export default subscription;
