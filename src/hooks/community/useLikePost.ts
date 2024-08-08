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
    mutationFn: async (data: LikePost): Promise<boolean> => {
      const response: AxiosResponse<BaseResponse<boolean>> =
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
                isLiked: data.isLiked,
                likeCount: data.isLiked
                  ? (post.likeCount || 0) + 1
                  : Math.max((post.likeCount || 0) - 1, 0),
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
    // onSuccess: (isLiked: boolean, variables: LikePost) => {
    //   queryClient.setQueriesData(
    //     {queryKey: ['get-latest-posts']},
    //     (oldData: any) => {
    //       if (!oldData || !oldData.pages) {
    //         return oldData;
    //       }
    //
    //       const updatePost = (post: FeedResponse) => {
    //         if (post.snowflakeId === variables.postId) {
    //           return {
    //             ...post,
    //             isLiked: isLiked,
    //             likeCount: post.likeCount,
    //           };
    //         }
    //         return post;
    //       };
    //
    //       return {
    //         ...oldData,
    //         pages: oldData.pages.map((page: FeedResponse[]) =>
    //           page.map(updatePost),
    //         ),
    //       };
    //     },
    //   );
    // },
  });
}
