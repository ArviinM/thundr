import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  CustomerMatchLocationRequest,
  CustomerMatchLocationResponse,
} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';

export function useCustomerMatchLocation() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['customer-match-location'],
    mutationFn: async (
      data: CustomerMatchLocationRequest,
    ): Promise<CustomerMatchLocationResponse> => {
      const response: AxiosResponse<
        BaseResponse<CustomerMatchLocationResponse>
      > = await axiosInstance.post('/match/match-location', data);

      if (response.status !== HttpStatusCode.Ok) {
        throw {
          name: 'customer-match-location',
          status: response.data.status,
          message: response.data.message,
          data: response.data.data,
        } as Error;
      }

      console.log(response.data);
      return response.data.data;
    },
    onError: showErrorToast,
  });
}
