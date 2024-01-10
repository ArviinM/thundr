import api from '..';
import {USER_PROFILE} from '../constants';

const UserProfileConfig = {
  updateUserProfile: payload =>
    api.post(USER_PROFILE.UPDATE_USER_PROFILE, payload),
};

export default UserProfileConfig;
