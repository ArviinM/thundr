import {useMutation} from '@tanstack/react-query';
import {AxiosRequestConfig, AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  CustomerDeactivateRequest,
} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';

export function useDeactivateAccount() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['customer-deactivate-account'],
    mutationFn: async (data: CustomerDeactivateRequest): Promise<string> => {
      const config: AxiosRequestConfig<any> = {
        params: {
          sub: data.sub,
        },
      };

      const response: AxiosResponse<BaseResponse<any>> =
        await axiosInstance.post('/customer/deactivate', null, config);

      if (response.status !== HttpStatusCode.Ok) {
        throw {
          name: 'read-notification',
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
