import api from '..';
import {PROFILE_CREATION} from '../constants';

const ProfileCreationConfig = {
  createProfile: payload => api.post(PROFILE_CREATION.CREATE_PROFILE, payload),
  uploadPhoto: payload => api.post(PROFILE_CREATION.UPLOAD_PHOTO, payload),
  compatibilityQuestions: payload =>
    api.get(PROFILE_CREATION.COMPATIBILITY_QUESTIONS, payload),
  compatibilityAnswers: payload =>
    api.post(PROFILE_CREATION.COMPATIBILITY_ANSWERS, payload),
  customerDetails: payload =>
    api.post(PROFILE_CREATION.CUSTOMER_DETAILS, payload),
};

export default ProfileCreationConfig;
