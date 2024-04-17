import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  CustomerMatchPostRequest,
  CustomerMatchPostResponse,
} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';

export function useCustomerMatch() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['customer-match'],
    mutationFn: async (
      data: CustomerMatchPostRequest,
    ): Promise<CustomerMatchPostResponse> => {
      const response: AxiosResponse<BaseResponse<CustomerMatchPostResponse>> =
        await axiosInstance.post('/match/customer-match', data);

      if (response.status !== HttpStatusCode.Ok) {
        throw {
          name: 'customer-match',
          status: response.data.status,
          message: response.data.message,
          data: response.data.data,
          statusCode: response.status,
        } as Error;
      }
      console.log(response.data.data);
      return response.data.data;
    },
    onError: showErrorToast,
  });
}
