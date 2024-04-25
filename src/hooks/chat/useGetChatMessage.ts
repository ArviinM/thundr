import {useQuery} from '@tanstack/react-query';
import {AxiosRequestConfig, AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  ChatMessage,
  ChatMessageRequest,
} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';

export function useGetChatMessage(props: ChatMessageRequest) {
  const axiosInstance = useAxiosWithAuth();

  return useQuery({
    queryKey: ['get-chat-message', props],
    refetchInterval: 15000,
    queryFn: async (): Promise<ChatMessage[]> => {
      const config: AxiosRequestConfig<ChatMessageRequest> = {
        params: {
          sub: props.sub,
          chatRoomID: props.chatRoomID,
          limit: props.limit,
          beforeId: props.beforeId || null,
        },
      };

      const response: AxiosResponse<BaseResponse<ChatMessage[]>> =
        await axiosInstance.get('/chat/v2/message', config);

      if (response.status !== HttpStatusCode.Ok) {
        showErrorToast({
          name: 'get-chat-message',
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
