import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from './api/useAxiosWithAuth.ts';
import {AuthDataRequest, AuthDataResponse} from '../types/generated.ts';

export function useSignInUser() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['user-login'],
    mutationFn: async (data: AuthDataRequest): Promise<any> => {
      const response: AxiosResponse<{data: AuthDataResponse}> =
        await axiosInstance.post('/auth/login', data);
      // if (response.status !== HttpStatusCode.Ok) {
      //     throw {
      //         name: 'useCreateCoach',
      //         statusCode: response.status,
      //         errorDetails: response.data as unknown as ErrorData,
      //     } as HookErrorDetails
      // }
      return response.data.data;
    },
    onError: e => console.error(e),
  });
}
