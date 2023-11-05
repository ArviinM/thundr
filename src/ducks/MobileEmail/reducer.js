import {
  START_EMAIL_VALIDATION,
  START_EMAIL_VALIDATION_FAILED,
  START_EMAIL_VALIDATION_SUCCESS,
  START_EMAIL_VERIFICATION,
  START_EMAIL_VERIFICATION_FAILED,
  START_EMAIL_VERIFICATION_SUCCESS,
  START_MOBILE_VALIDATION,
  START_MOBILE_VALIDATION_FAILED,
  START_MOBILE_VALIDATION_SUCCESS,
  START_MOBILE_VERIFICATION,
  START_MOBILE_VERIFICATION_FAILED,
  START_MOBILE_VERIFICATION_SUCCESS,
  START_PASSWORD_VALIDATION,
  START_PASSWORD_VALIDATION_FAILED,
  UPDATE_MOBILE_EMAIL_STATE,
} from './actionTypes';

export const INITIAL_STATE = {
  loading: false,
  mobileEmailData: [],
  phoneNumber: '',
};

const mobileEmail = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_MOBILE_EMAIL_STATE:
      return {
        ...state,
        ...action.newState,
      };
    // MOBILE VALIDATION
    case START_MOBILE_VALIDATION:
      return {
        ...state,
        ...action.payload,
        loading: true,
      };
    case START_MOBILE_VALIDATION_SUCCESS:
      return {
        ...state,
        mobileEmailData: action.payload,

        loading: false,
      };
    case START_MOBILE_VALIDATION_FAILED:
      return {
        ...state,
        loading: false,
      };
    // MOBILE OTP VERIFICATION
    case START_MOBILE_VERIFICATION:
      return {
        ...state,
        ...action.payload,
        loading: true,
      };
    case START_MOBILE_VERIFICATION_SUCCESS:
      return {
        ...state,
        mobileEmailData: action.payload,
        phoneNumber: action.payload.data.username,
        loading: false,
      };
    case START_MOBILE_VERIFICATION_FAILED:
      return {
        ...state,
        loading: false,
      };
    // EMAIL VALIDATION
    case START_EMAIL_VALIDATION:
      return {
        ...state,
        ...action.payload,
        loading: true,
      };
    case START_EMAIL_VALIDATION_SUCCESS:
      return {
        ...state,
        mobileEmailData: action.payload,
        loading: false,
      };
    case START_EMAIL_VALIDATION_FAILED:
      return {
        ...state,
        loading: false,
      };
    // EMAIL VERIFICATION
    case START_EMAIL_VERIFICATION:
      return {
        ...state,
        ...action.payload,
        loading: true,
      };
    case START_EMAIL_VERIFICATION_SUCCESS:
      return {
        ...state,
        mobileEmailData: action.payload,
        loading: false,
      };
    case START_EMAIL_VERIFICATION_FAILED:
      return {
        ...state,
        loading: false,
      };
    // PASSWORD VALIDATION
    case START_PASSWORD_VALIDATION:
      return {
        ...state,
        ...action.payload,
        loading: true,
      };
    case START_PASSWORD_VALIDATION_FAILED:
      return {
        ...state,
        mobileEmailData: action.payload,
        loading: false,
      };
    case START_PASSWORD_VALIDATION_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default mobileEmail;
