import {useQuery} from '@tanstack/react-query';
import {AxiosRequestConfig, AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';
import {
  BaseResponse,
  FeedResponse,
  GetPostRequest,
} from '../../types/generated.ts';

export function useGetPost(props: GetPostRequest) {
  const axiosInstance = useAxiosWithAuth();

  return useQuery({
    queryKey: ['get-post', props.postId],
    queryFn: async (): Promise<FeedResponse> => {
      const config: AxiosRequestConfig<GetPostRequest> = {
        params: {sub: props.sub},
      };

      const response: AxiosResponse<BaseResponse<FeedResponse>> =
        await axiosInstance.get(`/community/get-post/${props.postId}`, config);

      if (response.status !== HttpStatusCode.Ok) {
        showErrorToast({
          name: 'get-post',
          status: response.data.status,
          message: response.data.message,
          data: response.data,
          statusCode: response.status,
        });
      }

      return response.data.data;
    },
  });
}
