import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {BaseResponse, ChangePasswordRequest} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';

export function useChangePassword() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['change-password'],
    mutationFn: async (data: ChangePasswordRequest): Promise<string> => {
      const response: AxiosResponse<BaseResponse<string>> =
        await axiosInstance.post('/auth/change-password', data);

      if (response.status !== HttpStatusCode.Ok) {
        throw {
          name: 'change-password',
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
