import {useInfiniteQuery} from '@tanstack/react-query';
import {AxiosRequestConfig, AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  ChatMessage,
  ChatMessageRequest,
  IMessage,
} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';
import {transformChatMessageForGiftedChat} from './transformMessage.ts';

export function useGetChatMessage(props: ChatMessageRequest) {
  const axiosInstance = useAxiosWithAuth();

  return useInfiniteQuery({
    queryKey: ['get-chat-message', props],
    initialPageParam: props.beforeId,
    getNextPageParam: (lastPage: IMessage[]) => {
      if (lastPage.length !== 0) {
        return lastPage[lastPage.length - 1]._id;
      }
      return undefined;
    },
    queryFn: async ({pageParam = null}): Promise<IMessage[]> => {
      const config: AxiosRequestConfig<ChatMessageRequest> = {
        params: {
          sub: props.sub,
          chatRoomID: props.chatRoomID,
          limit: props.limit,
          beforeId: pageParam,
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

      return response.data.data.map(transformChatMessageForGiftedChat);
    },
  });
}
