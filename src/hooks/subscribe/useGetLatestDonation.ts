import {useQuery} from '@tanstack/react-query';
import {AxiosRequestConfig, AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  CustomerDonationRequest,
  CustomerDonationResponse,
} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';

export function useGetLatestDonation(props: CustomerDonationRequest) {
  const axiosInstance = useAxiosWithAuth();

  return useQuery({
    queryKey: ['get-latest-donation', props],
    queryFn: async (): Promise<CustomerDonationResponse> => {
      const config: AxiosRequestConfig<CustomerDonationRequest> = {
        params: {sub: props.sub},
      };

      const response: AxiosResponse<BaseResponse<CustomerDonationResponse>> =
        await axiosInstance.get('/subscribe/latest-advocacy-donation', config);

      if (response.status !== HttpStatusCode.Ok) {
        showErrorToast({
          name: 'get-latest-donation',
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
