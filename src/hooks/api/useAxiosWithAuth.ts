import axios, {AxiosInstance} from 'axios';
import {useAuthStore} from '../../store/authStore.ts';
import {API_BASE_URL} from '@env';
const AXIOS_TIMEOUT = 6000000;

function getCurrentAccessToken() {
  return useAuthStore.getState().authData?.accessToken;
}

export function useAxiosWithAuth(): AxiosInstance {
  const token = getCurrentAccessToken();
  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: AXIOS_TIMEOUT,
    validateStatus: () => true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  axiosInstance.interceptors.request.use(
    async requestConfig => {
      if (token) {
        requestConfig.headers.Authorization = `Bearer ${token}`;
      } else {
        requestConfig.headers.Authorization = '';
      }

      return requestConfig;
    },
    error => {
      return Promise.reject(error);
    },
  );

  axiosInstance.interceptors.response.use(async requestConfig => {
    requestConfig.headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    };

    return requestConfig;
  });

  return axiosInstance;
}
