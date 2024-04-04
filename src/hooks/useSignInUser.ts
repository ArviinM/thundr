import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from './api/useAxiosWithAuth.ts';
import {
  AuthDataRequest,
  AuthDataResponse,
  BaseResponse,
} from '../types/generated.ts';

export function useSignInUser() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['user-registration'],
    mutationFn: async (data: AuthDataRequest): Promise<AuthDataResponse> => {
      const response: AxiosResponse<BaseResponse<AuthDataResponse>> =
        await axiosInstance.post('/auth/login', data);

      if (response.status !== HttpStatusCode.Ok) {
        console.error(response.data);
        throw new Error('An error occurred with useSignInUser');
      }

      return response.data.data;
    },
    onError: e => console.error(e),
  });
}
