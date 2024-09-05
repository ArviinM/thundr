import {useQuery} from '@tanstack/react-query';
import {AxiosRequestConfig, AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';
import {
  BaseResponse,
  GetEditHistoryResponse,
  GetPostRequest,
} from '../../types/generated.ts';

export function useGetEditHistory(props: GetPostRequest) {
  const axiosInstance = useAxiosWithAuth();

  return useQuery({
    queryKey: ['get-edit-history', props.postId],
    queryFn: async (): Promise<GetEditHistoryResponse[]> => {
      const config: AxiosRequestConfig<GetPostRequest> = {
        params: {sub: props.sub},
      };

      const response: AxiosResponse<BaseResponse<GetEditHistoryResponse[]>> =
        await axiosInstance.get(
          `/community/edit-history/${props.postId}`,
          config,
        );

      if (response.status !== HttpStatusCode.Ok) {
        showErrorToast({
          name: 'get-edit-history',
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
