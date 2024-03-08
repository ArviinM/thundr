import {GENERIC_ERROR} from '../../utils/commons';
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
  START_PASSWORD_VALIDATION_SUCCESS,
  START_RESEND_SMS_OTP,
  START_RESEND_SMS_OTP_SUCCESS,
  START_RESEND_SMS_OTP_FAILED,
  UPDATE_MOBILE_EMAIL_STATE,
  START_RESEND_EMAIL_OTP,
  START_RESEND_EMAIL_OTP_SUCCESS,
  START_RESEND_EMAIL_OTP_FAILED,
} from './actionTypes';

export const INITIAL_STATE = {
  loading: false,
  mobileEmailData: [],
  phoneNumber: '',
  email: '',
  showModal: false,
  modalMessage: '',
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
        showModal: true,
        modalMessage: action.payload,
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
        showModal: true,
        modalMessage: action.payload,
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
        showModal: true,
        modalMessage: GENERIC_ERROR,
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
        showModal: true,
        modalMessage: action.payload,
      };
    // PASSWORD VALIDATION
    case START_PASSWORD_VALIDATION:
      return {
        ...state,
        ...action.payload,
        loading: true,
      };
    case START_PASSWORD_VALIDATION_SUCCESS:
      return {
        ...state,
        mobileEmailData: action.payload,
        loading: false,
      };
    case START_PASSWORD_VALIDATION_FAILED:
      return {
        ...state,
        loading: false,
        showModal: true,
        modalMessage: GENERIC_ERROR,
      };
    // RESEND SMS OTP
    case START_RESEND_SMS_OTP:
      return {
        ...state,
        ...action.payload,
        loading: true,
      };
    case START_RESEND_SMS_OTP_SUCCESS:
      return {
        ...state,
        mobileEmailData: action.payload,
        loading: false,
      };
    case START_RESEND_SMS_OTP_FAILED:
      return {
        ...state,
        loading: false,
        showModal: true,
        modalMessage: GENERIC_ERROR,
      };
    // RESEND EMAIL OTP
    case START_RESEND_EMAIL_OTP:
      return {
        ...state,
        ...action.payload,
        loading: true,
      };
    case START_RESEND_EMAIL_OTP_SUCCESS:
      return {
        ...state,
        mobileEmailData: action.payload,
        loading: false,
      };
    case START_RESEND_EMAIL_OTP_FAILED:
      return {
        ...state,
        loading: false,
        showModal: true,
        modalMessage: GENERIC_ERROR,
      };
    default:
      return state;
  }
};

export default mobileEmail;
