import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from './api/useAxiosWithAuth.ts';
import {
  AuthDataRequest,
  AuthDataResponse,
  BaseResponse,
} from '../types/generated.ts';
import {showErrorToast} from '../utils/toast/errorToast.ts';

//Will edit by Wednesday
export function useRefreshToken() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['user-refresh-token'],
    mutationFn: async (data: AuthDataRequest): Promise<AuthDataResponse> => {
      const response: AxiosResponse<BaseResponse<AuthDataResponse>> =
        await axiosInstance.post('/auth/login', data);

      if (response.status !== HttpStatusCode.Ok) {
        throw {
          name: 'user-registration',
          status: response.data.status,
          message: response.data.message,
          data: response.data.data,
        } as Error;
      }

      return response.data.data;
    },
    onError: showErrorToast,
  });
}
