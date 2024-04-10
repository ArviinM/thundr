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
import {showErrorToast} from '../../utils/toast/errorToast.ts';

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
        throw {
          name: 'customer-create-details',
          status: response.data.status,
          message: response.data.message,
          data: response.data.data,
        } as Error;
      }

      return response.data.data;
    },
    onError: showErrorToast,
  });
}
