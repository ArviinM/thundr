import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  CustomerCreateProfileRequest,
  CustomerCreateProfileResponse,
} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';

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
        throw {
          name: 'customer-create-profile',
          status: response.data.status,
          message: response.data.message,
        } as Error;
      }

      return response.data.data;
    },
    onError: showErrorToast,
  });
}
