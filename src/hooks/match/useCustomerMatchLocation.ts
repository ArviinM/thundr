import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  CustomerMatchLocationRequest,
  CustomerMatchLocationResponse,
} from '../../types/generated.ts';

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
        console.error(response.data);
        throw new Error('An error occurred with useCustomerMatchLocation');
      }

      console.log(response.data);
      return response.data.data;
    },
    onError: e => console.error(e),
  });
}
