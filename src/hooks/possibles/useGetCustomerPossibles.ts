import {useQuery} from '@tanstack/react-query';
import {AxiosRequestConfig, AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  Chat,
  ChatListRequest,
  PossiblesRequest,
  PossiblesResponse,
} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';

export function useGetCustomerPossibles(props: PossiblesRequest) {
  const axiosInstance = useAxiosWithAuth();

  return useQuery({
    queryKey: ['get-customer-possibles', props],
    enabled: true,
    queryFn: async (): Promise<PossiblesResponse> => {
      const config: AxiosRequestConfig<PossiblesRequest> = {
        params: {sub: props.sub, tag: props.tag},
      };

      const response: AxiosResponse<BaseResponse<PossiblesResponse>> =
        await axiosInstance.get('/match/v2/customer-possible', config);

      if (response.status !== HttpStatusCode.Ok) {
        showErrorToast({
          name: 'get-customer-possibles',
          status: response.data.status,
          message: response.data.message,
          data: response.data.data,
          statusCode: response.status,
        });
      }

      // console.log(JSON.stringify(response.data.data, 0, 2));

      return response.data.data;
    },
  });
}
