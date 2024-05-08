import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  ChatMessage,
  ChatSendMessageRequest,
} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';
// import {queryClient} from '../../utils/queryClient.ts';
// import {transformChatMessageForGiftedChat} from './transformMessage.ts';

export function useSendChatMessage() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['send-chat-message'],
    mutationFn: async (data: ChatSendMessageRequest): Promise<ChatMessage> => {
      const response: AxiosResponse<BaseResponse<ChatMessage>> =
        await axiosInstance.post('/chat/send-message', data);

      if (response.status !== HttpStatusCode.Ok) {
        throw {
          name: 'send-chat-message',
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
    //   // console.log(data);
    //   const sendingMessage = transformChatMessageForGiftedChat({
    //     id: data.id ? data.id : 0,
    //     message: data.message,
    //     chatRoomID: data.chatRoomID ? data.chatRoomID : '',
    //     targetSub: data.targetSub,
    //     created: new Date().toString(),
    //     senderSub: data.senderSub,
    //     attachments: [],
    //     isRead: 0,
    //     status: 'pending',
    //   });
    //
    //   queryClient.setQueriesData(
    //     {queryKey: ['get-chat-message']},
    //     (oldData: any) => {
    //       if (oldData.pages) {
    //         return {
    //           ...oldData,
    //           pages: [
    //             [sendingMessage, ...oldData.pages[0]],
    //             ...oldData.pages.slice(1),
    //           ],
    //         };
    //       } else {
    //         // Handle the case where there's no pagination if necessary
    //         return [sendingMessage, ...oldData];
    //       }
    //     },
    //   );
    // },
  });
}
