import api from '..';
import {LOGIN} from '../constants';

const LoginConfig = {
  login: payload => api.post(LOGIN.LOGIN, payload),
  logout: payload => api.post(LOGIN.LOGOUT, payload),
  loginViaRefreshToken: payload =>
    api.post(LOGIN.LOGIN_VIA_REFRESH_TOKEN, payload),
};

export default LoginConfig;
