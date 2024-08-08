import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  DeletePostRequest,
  FeedResponse,
  LikePost,
} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';
import {queryClient} from '../../utils/queryClient.ts';

export function useDeletePost() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['delete-post'],
    mutationFn: async (data: DeletePostRequest): Promise<boolean> => {
      const response: AxiosResponse<BaseResponse<boolean>> =
        await axiosInstance.post('/community/delete-post', data);

      if (response.status !== HttpStatusCode.Ok) {
        throw {
          name: 'delete-post',
          status: response.data.status,
          message: response.data.message,
          data: response.data.data,
          statusCode: response.status,
        } as Error;
      }

      return response.data.data;
    },
    onError: showErrorToast,
  });
}
