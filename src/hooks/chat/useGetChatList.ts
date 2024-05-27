import {useQuery} from '@tanstack/react-query';
import {AxiosRequestConfig, AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  ChatListRequest,
  ChatListResponse,
} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';
import useUnreadStore from '../../store/unreadStore.ts';

export function useGetChatList(props: ChatListRequest) {
  const axiosInstance = useAxiosWithAuth();

  return useQuery({
    queryKey: ['get-chat-list', props],
    queryFn: async (): Promise<ChatListResponse> => {
      const config: AxiosRequestConfig<ChatListRequest> = {
        params: {sub: props.sub},
      };

      const setIsUnreads = useUnreadStore.getState().setIsUnreads;

      const response: AxiosResponse<BaseResponse<ChatListResponse>> =
        await axiosInstance.get('/match/v2/customer-match', config);

      if (response.status !== HttpStatusCode.Ok) {
        showErrorToast({
          name: 'get-chat-list',
          status: response.data.status,
          message: response.data.message,
          data: response.data.data,
          statusCode: response.status,
        });
      }

      if (response.data.data.unreads > 0) {
        setIsUnreads(true);
      } else {
        setIsUnreads(false);
      }

      return response.data.data;
    },
  });
}
