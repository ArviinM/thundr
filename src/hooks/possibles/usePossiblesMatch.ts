import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  CustomerMatchPostRequest,
  CustomerMatchPostResponse,
} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';

export function usePossiblesMatch() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['customer-possibles'],
    mutationFn: async (
      data: CustomerMatchPostRequest,
    ): Promise<CustomerMatchPostResponse> => {
      const response: AxiosResponse<BaseResponse<CustomerMatchPostResponse>> =
        await axiosInstance.post('/match/v2/customer-possible/match', data);

      if (response.status !== HttpStatusCode.Ok) {
        throw {
          name: 'customer-possibles',
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
