import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  Attachment,
  BaseResponse,
  ChatMessage,
  ChatReactionRequest,
  ChatReactionResponse,
  ChatSendMessageRequest,
} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';
import {transformChatMessageForGiftedChat} from './transformMessage.ts';
import {queryClient} from '../../utils/queryClient.ts';

export function useReactMessage() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['send-react-message'],
    mutationFn: async (
      data: ChatReactionRequest,
    ): Promise<ChatReactionResponse> => {
      const response: AxiosResponse<BaseResponse<ChatReactionResponse>> =
        await axiosInstance.post('/chat/react', data);

      if (response.status !== HttpStatusCode.Ok) {
        throw {
          name: 'send-react-message',
          status: response.data.status,
          message: response.data.message,
          data: response.data.data,
          statusCode: response.status,
        } as Error;
      }
      return response.data.data;
    },
    onError: showErrorToast,
    // onMutate: data => {
    //   let newMessage = transformChatMessageForGiftedChat({
    //     id: data.id || Date.now(),
    //     message: data.message,
    //     attachments: (data.base64Files as Attachment[]) || [],
    //     created: new Date().toString(),
    //     senderSub: data.senderSub,
    //     targetSub: data.targetSub,
    //     chatRoomID: data.chatRoomID || '',
    //     isRead: 0,
    //     status: 'pending',
    //     replying: data.replying,
    //     replyingId: data.replyingToId,
    //     reactions: [],
    //     isUnsent: false,
    //   });
    //
    //   queryClient.setQueriesData(
    //     {queryKey: ['get-chat-message']},
    //     (oldData: any) => {
    //       if (oldData.pages) {
    //         return {
    //           ...oldData,
    //           pages: [
    //             [newMessage, ...oldData.pages[0]],
    //             ...oldData.pages.slice(1),
    //           ],
    //         };
    //       } else {
    //         return oldData;
    //       }
    //     },
    //   );
    // },
  });
}
