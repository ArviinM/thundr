import axios, {AxiosInstance} from 'axios';
import {useAuthStore} from '../../store/authStore';
import {API_BASE_URL} from '@env';
import {atob} from 'react-native-quick-base64';
import {
  AuthRefreshTokenRequest,
  AuthRefreshTokenResponse,
} from '../../types/generated.ts'; // For decoding the JWT

const AXIOS_TIMEOUT = 6000000;

function getCurrentAuthData() {
  return useAuthStore.getState().authData;
}

const refreshToken = async (
  data: AuthRefreshTokenRequest,
): Promise<AuthRefreshTokenResponse | null> => {
  try {
    const response = await axios.post('/auth/refresh', data);
    return response.data.data;
  } catch (error) {
    console.error('An error occurred in refreshing the token', error);
    return null;
  }
};

function isTokenExpiringSoon(
  token: string,
  thresholdInMinutes: number = 15,
): boolean {
  if (!token) {
    return false;
  }

  try {
    const [, payload] = token.split('.');
    const decodedPayload = JSON.parse(atob(payload));
    const expirationTime = decodedPayload.exp * 1000; // Convert to milliseconds
    const timeLeft = expirationTime - Date.now();
    const thresholdInMilliseconds = thresholdInMinutes * 60 * 1000;

    return timeLeft <= thresholdInMilliseconds;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true; // Assume it's expiring if there's an error
  }
}

export function useAxiosWithAuth(): AxiosInstance {
  let authData = getCurrentAuthData();

  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: AXIOS_TIMEOUT,
    validateStatus: () => true,
    headers: {
      Authorization: `Bearer ${authData?.accessToken}`,
    },
  });

  axiosInstance.interceptors.request.use(
    async requestConfig => {
      // Check if token is expiring soon
      if (authData?.accessToken && isTokenExpiringSoon(authData?.accessToken)) {
        try {
          // Refresh token
          const result = await refreshToken({
            refreshToken: authData.refreshToken,
            sub: authData.sub,
            username: authData.username,
          });

          const updatedAuthData = {
            ...useAuthStore.getState().authData,
            ...result,
          };
          // @ts-ignore
          useAuthStore.setState({authData: updatedAuthData});

          // Update token
          // @ts-ignore
          authData.accessToken = updatedAuthData.accessToken;
          requestConfig.headers.Authorization = `Bearer ${authData.accessToken}`;
        } catch (error) {
          console.error('Error refreshing token:', error);
          // Handle token refresh failure if necessary (e.g., force logout)
        }
      } else if (authData?.accessToken) {
        requestConfig.headers.Authorization = `Bearer ${authData.accessToken}`;
      } else {
        requestConfig.headers.Authorization = '';
      }

      return requestConfig;
    },
    error => {
      return Promise.reject(error);
    },
  );

  return axiosInstance;
}
