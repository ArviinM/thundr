import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {BaseResponse, FeedResponse, LikePost} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';
import {queryClient} from '../../utils/queryClient.ts';

export function useLikePost() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['like-post'],
    mutationFn: async (data: LikePost): Promise<string> => {
      const response: AxiosResponse<BaseResponse<string>> =
        await axiosInstance.post('/community/like', data);

      if (response.status !== HttpStatusCode.Ok) {
        throw {
          name: 'like-post',
          status: response.data.status,
          message: response.data.message,
          data: response.data.data,
          statusCode: response.status,
        } as Error;
      }

      return response.data.data;
    },
    onError: showErrorToast,
    onMutate: (data: LikePost) => {
      queryClient.setQueriesData(
        {queryKey: ['get-latest-posts']},
        (oldData: any) => {
          if (!oldData || !oldData.pages) {
            return oldData;
          }

          const updatePost = (post: FeedResponse) => {
            if (post.snowflakeId === data.postId) {
              return {
                ...post,
                isLiked: !post.isLiked,
                likeCount: post.isLiked
                  ? (post.likeCount || 1) - 1
                  : (post.likeCount || 0) + 1,
              };
            }
            return post;
          };

          return {
            ...oldData,
            pages: oldData.pages.map((page: FeedResponse[]) =>
              page.map(updatePost),
            ),
          };
        },
      );
    },
  });
}
