import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from './api/useAxiosWithAuth.ts';
import {
  AuthDataRequest,
  AuthDataResponse,
  BaseResponse,
} from '../types/generated.ts';
import {showErrorToast} from '../utils/toast/errorToast.ts';

export function useSignInUser() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['user-registration'],
    mutationFn: async (data: AuthDataRequest): Promise<AuthDataResponse> => {
      const response: AxiosResponse<BaseResponse<AuthDataResponse>> =
        await axiosInstance.post('/auth/login', data);

      if (response.status !== HttpStatusCode.Ok) {
        throw {
          name: 'user-registration',
          status: response.data.status,
          message: response.data.message,
        } as Error;
      }

      return response.data.data;
    },
    onError: showErrorToast,
  });
}
