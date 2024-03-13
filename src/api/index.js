import axios, {CancelToken} from 'axios';
import store from '../ducks/store';
import {API_BASE_URL} from '@env';

const AXIOS_TIMEOUT = 30000;

const config = {
  baseURL: 'https://dev-api.thundr.ph/',
  timeout: AXIOS_TIMEOUT,
};

const axiosInstance = axios.create(config);
const createCancelToken = () => {
  let cancel;
  const cancelToken = new CancelToken(c => {
    cancel = c;
  });
  return [cancelToken, cancel];
};

axiosInstance.interceptors.request.use(
  async requestConfig => {
    const {
      login: {loginData},
    } = store.getState();

    if (loginData) {
      requestConfig.headers.Authorization = `Bearer ${loginData?.accessToken}`;
    } else {
      requestConfig.headers.Authorization = '';
    }

    const [cancelToken, cancelRequest] = createCancelToken();

    requestConfig.cancelToken = cancelToken;

    setTimeout(() => {
      if (typeof cancelRequest === 'function') {
        cancelRequest('TIMEOUT');
      }
    }, AXIOS_TIMEOUT);

    return requestConfig;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(async requestConfig => {
  const {
    login: {loginData}, // Previous value is token, for debugging purposes
  } = store.getState();

  requestConfig.headers = {
    Authorization: `Bearer ${loginData.accessToken}`,
    Accept: 'application/json',
  };

  return requestConfig;
});

export default axiosInstance;
