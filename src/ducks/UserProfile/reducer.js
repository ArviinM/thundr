import {
  GET_FILTERS,
  GET_FILTERS_FAILED,
  GET_FILTERS_SUCCESS,
  UPDATE_FILTERS,
  UPDATE_FILTERS_FAILED,
  UPDATE_FILTERS_SUCCESS,
  UPDATE_FILTER_STATE,
  UPDATE_USER_PROFILE,
  UPDATE_USER_PROFILE_FAILED,
  UPDATE_USER_PROFILE_SUCCESS,
} from './actionTypes';

export const INITIAL_STATE = {
  loading: false,
  showModal: false,
  modalMessage: '',
  updatedUserProfile: [],
};

const userProfile = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_FILTER_STATE:
      return {
        ...state,
        ...action.newState,
      };
    // Update user profile
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        ...action.payload,
        loading: true,
      };
    case UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        updatedUserProfile: action.payload.data,
        loading: false,
      };
    case UPDATE_USER_PROFILE_FAILED:
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

export default userProfile;
