import {useQuery} from '@tanstack/react-query';
import {AxiosRequestConfig, AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';
import {BaseResponse, GetReplyRequest} from '../../types/generated.ts';

export function useGetReplies(props: GetReplyRequest) {
  const axiosInstance = useAxiosWithAuth();

  return useQuery({
    queryKey: ['get-post-replies', props.sub],
    queryFn: async (): Promise<any> => {
      const config: AxiosRequestConfig<GetReplyRequest> = {
        params: {sub: props.sub},
      };

      const response: AxiosResponse<BaseResponse<any>> =
        await axiosInstance.get(
          `/community/get-replies/${props.snowflakeId}`,
          config,
        );

      if (response.status !== HttpStatusCode.Ok) {
        showErrorToast({
          name: 'get-post-replies',
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
