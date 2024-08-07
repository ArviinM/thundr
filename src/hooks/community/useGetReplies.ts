import {useInfiniteQuery} from '@tanstack/react-query';
import {AxiosRequestConfig, AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  FeedResponse,
  GetReplyRequest,
} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';

export function useGetReplies(props: GetReplyRequest) {
  const axiosInstance = useAxiosWithAuth();

  return useInfiniteQuery({
    queryKey: ['get-replies', props],
    initialPageParam: props.beforeId,
    getNextPageParam: (lastPage: FeedResponse[]) => {
      if (lastPage.length !== 0) {
        return lastPage[lastPage.length - 1].snowflakeId;
      }
      return undefined;
    },
    queryFn: async ({pageParam = null}): Promise<FeedResponse[]> => {
      const config: AxiosRequestConfig<GetReplyRequest> = {
        params: {
          sub: props.sub,
          beforeId: pageParam,
        },
      };

      const response: AxiosResponse<BaseResponse<FeedResponse[]>> =
        await axiosInstance.get(
          `/community/get-replies/${props.snowflakeId}`,
          config,
        );

      if (response.status !== HttpStatusCode.Ok) {
        showErrorToast({
          name: 'get-replies',
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
