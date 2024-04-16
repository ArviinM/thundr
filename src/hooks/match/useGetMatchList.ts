import {useQuery} from '@tanstack/react-query';
import {AxiosRequestConfig, AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';
import {
  BaseResponse,
  CustomerMatchRequest,
  CustomerMatchResponse,
} from '../../types/generated.ts';

export function useGetMatchList(props: CustomerMatchRequest) {
  const axiosInstance = useAxiosWithAuth();

  return useQuery({
    queryKey: ['get-match-list', props.sub],
    enabled: false,
    queryFn: async (): Promise<CustomerMatchResponse[]> => {
      const config: AxiosRequestConfig<CustomerMatchRequest> = {
        params: {sub: props.sub},
      };

      const response: AxiosResponse<BaseResponse<CustomerMatchResponse[]>> =
        await axiosInstance.get('/match/match', config);

      if (response.status !== HttpStatusCode.Ok) {
        showErrorToast({
          name: 'get-match-list',
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
