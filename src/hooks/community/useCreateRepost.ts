import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  FeedResponse,
  LikePost,
  RepostRequest,
} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';
import {queryClient} from '../../utils/queryClient.ts';

export function useCreateRepost() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['create-repost'],
    mutationFn: async (data: RepostRequest): Promise<boolean> => {
      const response: AxiosResponse<BaseResponse<boolean>> =
        await axiosInstance.post('/community/create-repost', data);

      if (response.status !== HttpStatusCode.Ok) {
        throw {
          name: 'create-repost',
          status: response.data.status,
          message: response.data.message,
          data: response.data.data,
          statusCode: response.status,
        } as Error;
      }

      return response.data.data;
    },
    onError: showErrorToast,
    onMutate: (data: RepostRequest) => {
      // Update get-latest-posts query
      queryClient.setQueriesData(
        {queryKey: ['get-latest-posts']},
        (oldData: any) => {
          if (!oldData || !oldData.pages) {
            return oldData;
          }

          return {
            ...oldData,
            pages: oldData.pages.map((page: FeedResponse[]) =>
              page.map(post =>
                post.snowflakeId === data.postId
                  ? {
                      ...post,
                      isReposted: data.isReposted,
                      repostCount: data.isReposted
                        ? (post.repostCount || 0) + 1
                        : Math.max((post.repostCount || 0) - 1, 0),
                    }
                  : post,
              ),
            ),
          };
        },
      );
      // Update get-post query
      queryClient.setQueryData(
        ['get-post', data.postId],
        (oldData: FeedResponse | undefined) => {
          if (!oldData) {
            return oldData;
          }

          return {
            ...oldData,
            isReposted: data.isReposted,
            repostCount: data.isReposted
              ? (oldData.repostCount || 0) + 1
              : Math.max((oldData.repostCount || 0) - 1, 0),
          };
        },
      );
    },
    onSuccess: (isReposted: boolean, variables: RepostRequest) => {
      queryClient.setQueriesData(
        {queryKey: ['get-latest-posts']},
        (oldData: any) => {
          if (!oldData || !oldData.pages) {
            return oldData;
          }

          const updatePost = (post: FeedResponse) => {
            if (post.snowflakeId === variables.postId) {
              return {
                ...post,
                repostCount: post.repostCount,
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

      // // Update get-post query
      queryClient.setQueriesData(
        {queryKey: ['get-post', variables.postId]},
        (oldData: FeedResponse | undefined) => {
          if (!oldData) {
            return oldData;
          }

          return {
            ...oldData,
            repostCount: oldData.repostCount,
          };
        },
      );
    },
  });
}
