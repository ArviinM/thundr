import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  ChatMessage,
  ChatSendMessageRequest,
} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';
import {transformChatMessageForGiftedChat} from './transformMessage.ts';
import {queryClient} from '../../utils/queryClient.ts';
import {checkFileExists} from '../../utils/utils.ts';

export function useSendChatMessage() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['send-chat-message'],
    mutationFn: async (data: ChatSendMessageRequest): Promise<ChatMessage> => {
      let formData = new FormData();
      let newMessage = {
        id: data.id,
        senderSub: data.senderSub,
        targetSub: data.targetSub,
        message: data.message,
        read: data.read,
        replyingToId: data.replyingToId,
      };

      formData.append('message', JSON.stringify(newMessage));

      if (data.attachments) {
        for (const mediaItem of data.attachments) {
          // const index = data.attachments.indexOf(mediaItem);
          const fileUri = mediaItem.filePath;
          if (await checkFileExists(fileUri)) {
            formData.append('media', {
              uri: fileUri,
              type: mediaItem.fileType,
              name: mediaItem.fileName || fileUri.split('/').pop(),
            });
          } else {
            throw {
              name: 'send-chat-message',
              status: 'null',
              message: 'File does not exist',
            } as Error;
          }
        }
      }

      const response: AxiosResponse<BaseResponse<ChatMessage>> =
        await axiosInstance.post('/chat/send-message', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

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
    onMutate: data => {
      let newMessage = transformChatMessageForGiftedChat({
        id: data.id || Date.now(),
        message: data.message,
        attachments:
          data.attachments && data.attachments.length > 0
            ? Array.from({length: data.attachments.length}, () => ({
                fileUrl: '',
                mimeType:
                  data.attachments &&
                  data.attachments[0].fileType.startsWith('image/')
                    ? 'image/jpeg'
                    : 'video/mp4',
              }))
            : [],
        created: new Date().toString(),
        senderSub: data.senderSub,
        targetSub: data.targetSub,
        chatRoomID: data.chatRoomID || '',
        isRead: 0,
        status: 'pending',
        replying: data.replying,
        replyingId: data.replyingToId,
        reactions: [],
        isUnsent: false,
        // type: data.type,
      });

      console.log(JSON.stringify(newMessage, null, 2));

      queryClient.setQueriesData(
        {queryKey: ['get-chat-message']},
        (oldData: any) => {
          if (oldData.pages) {
            return {
              ...oldData,
              pages: [
                [newMessage, ...oldData.pages[0]],
                ...oldData.pages.slice(1),
              ],
            };
          } else {
            return oldData;
          }
        },
      );
    },
  });
}
