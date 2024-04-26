import {useQuery} from '@tanstack/react-query';
import {AxiosRequestConfig, AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';
import {
  BaseResponse,
  GetCustomerFilterRequest,
  GetCustomerFiltersResponse,
} from '../../types/generated.ts';

export function useGetCustomerFilters(props: GetCustomerFilterRequest) {
  const axiosInstance = useAxiosWithAuth();

  return useQuery({
    queryKey: ['get-customer-filters', props.sub],
    queryFn: async (): Promise<GetCustomerFiltersResponse> => {
      const config: AxiosRequestConfig<GetCustomerFilterRequest> = {
        params: {sub: props.sub},
      };

      const response: AxiosResponse<BaseResponse<GetCustomerFiltersResponse>> =
        await axiosInstance.get('/customer/filter', config);

      if (response.status !== HttpStatusCode.Ok) {
        showErrorToast({
          name: 'get-customer-filters',
          status: response.data.status,
          message: response.data.message,
          data: response.data.data,
          statusCode: response.status,
        });
      }

      console.log(response.data.data);

      return response.data.data;
    },
  });
}
