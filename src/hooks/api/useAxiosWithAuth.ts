import axios, {AxiosInstance} from 'axios';
import {useAuthStore} from '../../store/authStore.ts';
import {API_BASE_URL} from '@env';
const AXIOS_TIMEOUT = 6000000;

export function useAxiosWithAuth(): AxiosInstance {
  // Use the hook directly to ensure reactivity
  const token = useAuthStore(state => state.authData?.accessToken);

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
      requestConfig.headers.Authorization = token ? `Bearer ${token}` : '';
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
