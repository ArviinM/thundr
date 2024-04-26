import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {BaseResponse, CustomerFilter} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';

export function useCustomerFilters() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['customer-filters'],
    mutationFn: async (data: CustomerFilter): Promise<CustomerFilter> => {
      const response: AxiosResponse<BaseResponse<CustomerFilter>> =
        await axiosInstance.post('/customer/filter', data);

      if (response.status !== HttpStatusCode.Ok) {
        throw {
          name: 'customer-filters',
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
