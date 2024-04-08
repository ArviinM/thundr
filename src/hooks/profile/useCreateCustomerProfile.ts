import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  CustomerCreateProfileRequest,
  CustomerCreateProfileResponse,
} from '../../types/generated.ts';

export function useCreateCustomerProfile() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['customer-create-profile'],
    mutationFn: async (
      data: CustomerCreateProfileRequest,
    ): Promise<CustomerCreateProfileResponse> => {
      const response: AxiosResponse<
        BaseResponse<CustomerCreateProfileResponse>
      > = await axiosInstance.post('/customer/create-profile', data);

      if (response.status !== HttpStatusCode.Ok) {
        console.error(response.data);
        throw new Error('An error occurred with useCreateCustomerProfile');
      }

      console.log(response.data);
      return response.data.data;
    },
    onError: e => console.error(e),
  });
}
