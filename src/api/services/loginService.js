import api from '..';
import {LOGIN} from '../constants';

const LoginConfig = {
  login: payload => api.post(LOGIN.LOGIN, payload),
  logout: payload => api.post(LOGIN.LOGOUT, payload),
};

export default LoginConfig;
