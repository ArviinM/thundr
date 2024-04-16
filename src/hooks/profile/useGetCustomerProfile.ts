import {useQuery} from '@tanstack/react-query';
import {AxiosRequestConfig, AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  CompatibilityQuestion,
  CompatibilityQuestionsRequest,
  CustomerData,
  CustomerProfileRequest,
} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';

export function useGetCustomerProfile(props: CustomerProfileRequest) {
  const axiosInstance = useAxiosWithAuth();

  return useQuery({
    queryKey: ['get-customer-profile', props],
    enabled: true,
    queryFn: async (): Promise<CustomerData> => {
      const config: AxiosRequestConfig<CustomerProfileRequest> = {
        params: {sub: props.sub},
      };

      const response: AxiosResponse<BaseResponse<CustomerData>> =
        await axiosInstance.get('/customer/profile', config);

      if (response.status !== HttpStatusCode.Ok) {
        showErrorToast({
          name: 'get-customer-profile',
          status: response.data.status,
          message: response.data.message,
          data: response.data.data,
          statusCode: response.status,
        });
      }

      return response.data.data;
    },
  });
}
