import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  CustomerCreateProfileRequest,
  CustomerCreateProfileResponse,
  CustomerDetailsRequest,
  CustomerDetailsResponse,
} from '../../types/generated.ts';

export function useCreateCustomerDetails() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['customer-create-details'],
    mutationFn: async (
      data: CustomerDetailsRequest,
    ): Promise<CustomerDetailsResponse> => {
      const response: AxiosResponse<BaseResponse<CustomerDetailsResponse>> =
        await axiosInstance.post('/customer/details', data);

      if (response.status !== HttpStatusCode.Ok) {
        console.error(response.data);
        throw new Error('An error occurred with useCreateCustomerDetails');
      }

      return response.data.data;
    },
    onError: e => console.error(e),
  });
}
