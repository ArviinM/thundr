import {useQuery} from '@tanstack/react-query';
import {AxiosRequestConfig, AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  CustomerSubscribedRequest,
  CustomerSubscribedResponse,
} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';

export function useGetCustomerSubscribed(props: CustomerSubscribedRequest) {
  const axiosInstance = useAxiosWithAuth();

  return useQuery({
    queryKey: ['get-customer-subscribed', props],
    queryFn: async (): Promise<CustomerSubscribedResponse> => {
      const config: AxiosRequestConfig<CustomerSubscribedRequest> = {
        params: {sub: props.sub, productId: props.productId},
      };

      const response: AxiosResponse<BaseResponse<CustomerSubscribedResponse>> =
        await axiosInstance.get('/subscribe/has-subscription', config);

      if (response.status !== HttpStatusCode.Ok) {
        showErrorToast({
          name: 'get-customer-subscribed',
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
