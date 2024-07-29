import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  FeedResponse,
  PostRequest,
} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';

export function useCreatePost() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['create-post'],
    mutationFn: async (data: PostRequest): Promise<any> => {
      let formData = new FormData();

      formData.append('sub', data.sub);
      formData.append('content', data.content);
      formData.append('inCommunity', data.inCommunity.toString());

      const response: AxiosResponse<BaseResponse<FeedResponse>> =
        await axiosInstance.post('/community/create-post', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      console.log(response.data);
      if (response.status !== HttpStatusCode.Ok) {
        throw {
          name: 'create-post',
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
