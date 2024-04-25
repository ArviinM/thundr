import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {BaseResponse, ChatMessage} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';

export function useSendChatMessage() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['send-chat-message'],
    mutationFn: async (formData: FormData): Promise<ChatMessage> => {
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
  });
}
