import axios, {AxiosInstance, CancelToken} from 'axios';
import {useAuth} from '../../providers/Auth.tsx';
import {useAuthStore} from '../../store/authStore.ts';

const AXIOS_TIMEOUT = 30000;

function getCurrentAccessToken() {
  // this is how you access the zustand store outside of React.
  return useAuthStore.getState().authData?.accessToken;
}

export function useAxiosWithAuth(): AxiosInstance {
  const token = getCurrentAccessToken();
  const axiosInstance = axios.create({
    baseURL: 'https://dev-api.thundr.ph/',
    timeout: AXIOS_TIMEOUT,
    validateStatus: () => true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Add a request interceptor
  axiosInstance.interceptors.request.use(
    async requestConfig => {
      const token = getCurrentAccessToken();

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
    const token = getCurrentAccessToken();

    requestConfig.headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    };

    return requestConfig;
  });

  return axiosInstance;
}
