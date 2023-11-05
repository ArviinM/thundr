import api from '..';
import {MOBILE_EMAIL} from '../constants';

const MobileEmailConfig = {
  mobileValidation: payload =>
    api.post(MOBILE_EMAIL.MOBILE_VALIDATION, payload),
  mobileVerification: payload =>
    api.post(MOBILE_EMAIL.MOBILE_VERIFICATION, payload),
  emailValidation: payload => api.post(MOBILE_EMAIL.EMAIL_VALIDATION, payload),
  emailVerification: payload =>
    api.post(MOBILE_EMAIL.EMAIL_VERIFICATION, payload),
};

export default MobileEmailConfig;
