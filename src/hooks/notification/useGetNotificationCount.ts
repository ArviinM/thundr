import {useQuery} from '@tanstack/react-query';
import {AxiosRequestConfig, AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';
import {BaseResponse, GenericCustomerRequest} from '../../types/generated.ts';
import useNotificationCountStore from '../../store/notificationCountStore.ts';

export function useGetNotificationCount(props: GenericCustomerRequest) {
  const axiosInstance = useAxiosWithAuth();

  return useQuery({
    queryKey: ['get-notification-count', props.sub],
    queryFn: async (): Promise<number> => {
      const config: AxiosRequestConfig<GenericCustomerRequest> = {
        params: {sub: props.sub},
      };

      const setUnreadNotificationCount =
        useNotificationCountStore.getState().setUnreadCount;

      const response: AxiosResponse<BaseResponse<number>> =
        await axiosInstance.get('/notification/notification-count', config);

      if (response.status !== HttpStatusCode.Ok) {
        showErrorToast({
          name: 'get-notification-count',
          status: response.data.status,
          message: response.data.message,
          data: response.data,
          statusCode: response.status,
        });
      }

      if (response.data.data > 0) {
        setUnreadNotificationCount(response.data.data);
      } else {
        setUnreadNotificationCount(0);
      }

      return response.data.data;
    },
  });
}
