import {useQuery} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';
import {BaseResponse, FeedResponse} from '../../types/generated.ts';

export function useGetAllPost() {
  const axiosInstance = useAxiosWithAuth();

  return useQuery({
    queryKey: ['get-all-post'],
    queryFn: async (): Promise<FeedResponse[]> => {
      const response: AxiosResponse<BaseResponse<FeedResponse[]>> =
        await axiosInstance.get('/community/get-latest-posts');

      if (response.status !== HttpStatusCode.Ok) {
        showErrorToast({
          name: 'get-all-post',
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
