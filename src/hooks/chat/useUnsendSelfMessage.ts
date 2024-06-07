import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {BaseResponse, ChatUnsendMessageRequest} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';

export function useUnsendSelfMessage() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['unsend-self-message'],
    mutationFn: async (data: ChatUnsendMessageRequest): Promise<any> => {
      const response: AxiosResponse<BaseResponse<any>> =
        await axiosInstance.post('/chat/unsend-self', data);

      if (response.status !== HttpStatusCode.Ok) {
        throw {
          name: 'unsend-self-message',
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
