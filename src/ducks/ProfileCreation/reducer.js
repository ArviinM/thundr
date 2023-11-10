import {GENERIC_ERROR} from '../../utils/commons';
import {
  GET_COMPATIBILTY_QUESTIONS,
  GET_COMPATIBILTY_QUESTIONS_FAILED,
  GET_COMPATIBILTY_QUESTIONS_SUCCESS,
  START_PROFILE_CREATION,
  START_PROFILE_CREATION_FAILED,
  START_PROFILE_CREATION_SUCCESS,
  SUBMIT_COMPATIBILITY_ANSWER,
  SUBMIT_COMPATIBILITY_ANSWER_FAILED,
  SUBMIT_COMPATIBILITY_ANSWER_SUCCESS,
  SUBMIT_CUSTOMER_DETAILS,
  SUBMIT_CUSTOMER_DETAILS_FAILED,
  SUBMIT_CUSTOMER_DETAILS_SUCCESS,
  UPDATE_PROFILE_CREATION_STATE,
  UPLOAD_PHOTO,
  UPLOAD_PHOTO_FAILED,
  UPLOAD_PHOTO_SUCCESS,
} from './actionTypes';

export const INITIAL_STATE = {
  loading: false,
  profileCreationData: [],
  compatibilityQuestions: [],
  showModal: false,
  modalMessage: '',
};

const profileCreation = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_CREATION_STATE:
      return {
        ...state,
        ...action.newState,
      };
    // CREATE USER PROFILE
    case START_PROFILE_CREATION:
      return {
        ...state,
        ...action.payload,
        loading: true,
      };
    case START_PROFILE_CREATION_SUCCESS:
      return {
        ...state,
        mobileEmailData: action.payload,
        loading: false,
      };
    case START_PROFILE_CREATION_FAILED:
      return {
        ...state,
        loading: false,
        showModal: true,
        modalMessage: action.payload,
      };
    // GET COMPATIBILITY QUESTIONS
    case GET_COMPATIBILTY_QUESTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case GET_COMPATIBILTY_QUESTIONS_SUCCESS:
      return {
        ...state,
        compatibilityQuestions: action.payload,
        loading: false,
      };
    case GET_COMPATIBILTY_QUESTIONS_FAILED:
      return {
        ...state,
        loading: false,
        showModal: true,
        modalMessage: GENERIC_ERROR,
      };
    // SUBMIT COMPATIBILITY ANSWER
    case SUBMIT_COMPATIBILITY_ANSWER:
      return {
        ...state,
        ...action.payload,
        loading: true,
      };
    case SUBMIT_COMPATIBILITY_ANSWER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case SUBMIT_COMPATIBILITY_ANSWER_FAILED:
      return {
        ...state,
        loading: false,
        showModal: true,
        modalMessage: GENERIC_ERROR,
      };
    // SUBMIT CUSTOMER DETAILS
    case SUBMIT_CUSTOMER_DETAILS:
      return {
        ...state,
        ...action.payload,
        loading: true,
      };
    case SUBMIT_CUSTOMER_DETAILS_SUCCESS:
      return {
        ...state,
        profileCreationData: action.payload,
        loading: false,
      };
    case SUBMIT_CUSTOMER_DETAILS_FAILED:
      return {
        ...state,
        loading: false,
        showModal: true,
        modalMessage: GENERIC_ERROR,
      };
    // UPLOAD PHOTO
    case UPLOAD_PHOTO:
      return {
        ...state,
        ...action.payload,
        loading: true,
      };
    case UPLOAD_PHOTO_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case UPLOAD_PHOTO_FAILED:
      return {
        ...state,
        loading: false,
        showModal: true,
        modalMessage:
          "There's something wrong with the photo you uploaded. Please try again.",
      };
    default:
      return state;
  }
};

export default profileCreation;
