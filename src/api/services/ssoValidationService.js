import api from '..';
import {SSO_VALIDATION} from '../constants';

const SSOValidationConfig = {
  ssoMobileValidation: payload =>
    api.post(SSO_VALIDATION.SSO_MOBILE_VALIDATION, payload),
  ssoMobileVerification: payload =>
    api.post(SSO_VALIDATION.SSO_MOBILE_VERIFICATION, payload),
  ssoMobileResendVerification: payload =>
    api.post(SSO_VALIDATION.SSO_MOBILE_RESEND_OTP, payload),
};

export default SSOValidationConfig;
