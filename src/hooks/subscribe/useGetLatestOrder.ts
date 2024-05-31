import {useQuery} from '@tanstack/react-query';
import {AxiosRequestConfig, AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  CustomerLatestOrderRequest,
  CustomerLatestOrderResponse,
} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';

export function useGetLatestOrder(props: CustomerLatestOrderRequest) {
  const axiosInstance = useAxiosWithAuth();

  return useQuery({
    queryKey: ['get-latest-order-by-product', props],
    queryFn: async (): Promise<CustomerLatestOrderResponse> => {
      const config: AxiosRequestConfig<CustomerLatestOrderRequest> = {
        params: {sub: props.sub, product: props.product},
      };

      const response: AxiosResponse<BaseResponse<CustomerLatestOrderResponse>> =
        await axiosInstance.get('/subscribe/latest-order-by-product', config);

      if (response.status !== HttpStatusCode.Ok) {
        showErrorToast({
          name: 'get-latest-order-by-product',
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
