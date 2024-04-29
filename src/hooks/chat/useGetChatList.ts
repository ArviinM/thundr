import {useQuery} from '@tanstack/react-query';
import {AxiosRequestConfig, AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {BaseResponse, Chat, ChatListRequest} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';

export function useGetChatList(props: ChatListRequest) {
  const axiosInstance = useAxiosWithAuth();

  return useQuery({
    queryKey: ['get-chat-list', props],
    enabled: true,
    queryFn: async (): Promise<Chat[]> => {
      const config: AxiosRequestConfig<ChatListRequest> = {
        params: {sub: props.sub},
      };

      const response: AxiosResponse<BaseResponse<Chat[]>> =
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

      // console.log(JSON.stringify(response.data.data, 0, 2));

      return response.data.data;
    },
  });
}
