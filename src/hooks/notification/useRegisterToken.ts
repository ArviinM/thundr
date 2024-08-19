import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {BaseResponse, CustomerFCMTokenRequest} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';

export function useRegisterToken() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['register-token'],
    mutationFn: async (data: CustomerFCMTokenRequest): Promise<string> => {
      const response: AxiosResponse<BaseResponse<string>> =
        await axiosInstance.post('/notification/register-token', data);

      if (response.status !== HttpStatusCode.Ok) {
        throw {
          name: 'register-token',
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
