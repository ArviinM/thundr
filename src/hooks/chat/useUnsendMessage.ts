import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  ChatUnsendMessageRequest,
  IMessage,
} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';
import {queryClient} from '../../utils/queryClient.ts';

export function useUnsendMessage() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['unsend-message'],
    mutationFn: async (data: ChatUnsendMessageRequest): Promise<any> => {
      const response: AxiosResponse<BaseResponse<any>> =
        await axiosInstance.post('/chat/unsend', data);

      if (response.status !== HttpStatusCode.Ok) {
        throw {
          name: 'unsend-message',
          status: response.data.status,
          message: response.data.message,
          data: response.data.data,
          statusCode: response.status,
        } as Error;
      }
      return response.data.data;
    },
    onError: showErrorToast,
    onMutate: async (data: ChatUnsendMessageRequest): Promise<any> => {
      queryClient.setQueriesData(
        {queryKey: ['get-chat-message']},
        (oldData: any) => {
          if (oldData?.pages) {
            for (const page of oldData.pages) {
              const messageIndex = page.findIndex(
                (msg: IMessage) => msg._id === data.messageId,
              );

              if (messageIndex !== -1) {
                // Update unsent on the original message if it's found
                page[messageIndex] = {
                  ...page[messageIndex],
                  unsent: true,
                  sent: false,
                  pending: false,
                  received: false,
                };
                break; // Stop searching once found
              }
            }
            return oldData; // Return the updated oldData
          } else {
            return oldData;
          }
        },
      );
    },
  });
}
