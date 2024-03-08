import {GENERIC_ERROR} from '../../utils/commons';
import {
  START_SSO_MOBILE_RESEND_OTP,
  START_SSO_MOBILE_RESEND_OTP_FAILED,
  START_SSO_MOBILE_RESEND_OTP_SUCCESS,
  START_SSO_MOBILE_VALIDATION,
  START_SSO_MOBILE_VALIDATION_FAILED,
  START_SSO_MOBILE_VALIDATION_SUCCESS,
  START_SSO_MOBILE_VERIFICATION,
  START_SSO_MOBILE_VERIFICATION_FAILED,
  START_SSO_MOBILE_VERIFICATION_SUCCESS,
  UPDATE_SSO_VALIDATION_STATE,
} from './actionTypes';

export const INITIAL_STATE = {
  loading: false,
  ssoValidationData: [],
  showModal: false,
  modalMessage: '',
  sub: '',
  loginViaSSO: false,
  accessToken: '',
};

const ssoValidation = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_SSO_VALIDATION_STATE:
      return {
        ...state,
        ...action.newState,
      };
    // MOBILE VALIDATION
    case START_SSO_MOBILE_VALIDATION:
      return {
        ...state,
        ...action.payload,
        sub: action.payload.sub,
        loading: true,
      };
    case START_SSO_MOBILE_VALIDATION_SUCCESS:
      return {
        ...state,
        ssoValidationData: action.payload,
        loading: false,
      };
    case START_SSO_MOBILE_VALIDATION_FAILED:
      return {
        ...state,
        loading: false,
        showModal: true,
        modalMessage: action.payload,
      };
    // MOBILE OTP VERIFICATION
    case START_SSO_MOBILE_VERIFICATION:
      return {
        ...state,
        ...action.payload,
        loading: true,
      };
    case START_SSO_MOBILE_VERIFICATION_SUCCESS:
      return {
        ...state,
        ssoValidationData: action.payload,
        phoneNumber: action.payload.data.username,
        loading: false,
      };
    case START_SSO_MOBILE_VERIFICATION_FAILED:
      return {
        ...state,
        loading: false,
        showModal: true,
        modalMessage: action.payload,
      };
    // MOBILE RESEND OTP
    case START_SSO_MOBILE_RESEND_OTP:
      return {
        ...state,
        ...action.payload,
        loading: true,
      };
    case START_SSO_MOBILE_RESEND_OTP_SUCCESS:
      return {
        ...state,
        ssoValidationData: action.payload,
        loading: false,
      };
    case START_SSO_MOBILE_RESEND_OTP_FAILED:
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

export default ssoValidation;
