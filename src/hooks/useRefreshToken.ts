import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from './api/useAxiosWithAuth.ts';
import {
  AuthRefreshTokenRequest,
  AuthRefreshTokenResponse,
  BaseResponse,
} from '../types/generated.ts';
import {showErrorToast} from '../utils/toast/errorToast.ts';

export function useRefreshToken() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['user-refresh-token'],
    mutationFn: async (
      data: AuthRefreshTokenRequest,
    ): Promise<AuthRefreshTokenResponse> => {
      const response: AxiosResponse<BaseResponse<AuthRefreshTokenResponse>> =
        await axiosInstance.post('/auth/refresh', data);

      if (response.status !== HttpStatusCode.Ok) {
        throw {
          name: 'user-refresh-token',
          status: response.data.status,
          message: response.data.message,
          data: response.data.data,
          statusCode: response.status,
        } as Error;
      }

      return response.data.data;
    },
    onError: showErrorToast,
  });
}
