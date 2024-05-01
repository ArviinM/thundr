import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  ChatMessage,
  ChatReadRequest,
} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';

export function useReadMessage() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['read-chat-message'],
    mutationFn: async (data: any): Promise<ChatMessage[]> => {
      console.log({data});
      const response: AxiosResponse<BaseResponse<ChatMessage[]>> =
        await axiosInstance.post('/chat/message-read', data);

      if (response.status !== HttpStatusCode.Ok) {
        throw {
          name: 'read-chat-message',
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
