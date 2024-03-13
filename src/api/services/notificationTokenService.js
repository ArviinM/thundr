import api from '..';
import {USER_DEVICE_TOKEN} from '../constants';

const notificationTokenConfig = {
  registerDeviceToken: payload =>
    api.post(USER_DEVICE_TOKEN.REGISTER_USER_DEVICE_TOKEN, payload),
};

export default notificationTokenConfig;
