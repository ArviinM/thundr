import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  EditPostRequest,
  FeedResponse,
} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';

export function useEditPost() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['edit-post'],
    mutationFn: async (data: EditPostRequest): Promise<any> => {
      const response: AxiosResponse<BaseResponse<FeedResponse>> =
        await axiosInstance.post(`/community/edit-post/${data.postId}`, data);

      if (response.status !== HttpStatusCode.Ok) {
        throw {
          name: 'edit-post',
          status: response.data.status,
          message: response.data.message,
          data: response.data.data,
          statusCode: response.status,
        } as Error;
      }

      console.log(response.data);

      return response.data.data;
    },
    onError: showErrorToast,
  });
}
