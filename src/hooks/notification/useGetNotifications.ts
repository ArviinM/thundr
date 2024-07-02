import {
  BaseResponse,
  NotificationRequest,
  NotificationResponse,
} from '../../types/generated.ts';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {useInfiniteQuery} from '@tanstack/react-query';
import {AxiosRequestConfig, AxiosResponse, HttpStatusCode} from 'axios';
import {showErrorToast} from '../../utils/toast/errorToast.ts';
import {Section, transformNotifications} from '../../utils/utils.ts';

export function useGetNotifications(props: NotificationRequest) {
  const axiosInstance = useAxiosWithAuth();

  return useInfiniteQuery({
    queryKey: ['get-customer-notifications', props],
    // refetchInterval: 10000,
    initialPageParam: undefined,
    getNextPageParam: (lastPage: Section[]) => {
      if (lastPage.length !== 0) {
        const lastSection = lastPage[lastPage.length - 1];
        const lastNotification = lastSection.data[lastSection.data.length - 1];
        return lastNotification ? lastNotification.id : undefined;
      }
      return undefined;
    },
    queryFn: async ({pageParam = null}): Promise<Section[]> => {
      const config: AxiosRequestConfig<NotificationRequest> = {
        params: {
          sub: props.sub,
          // beforeId: pageParam,
        },
      };

      const response: AxiosResponse<BaseResponse<NotificationResponse[]>> =
        await axiosInstance.get('/notification/get-notifications', config);

      if (response.status !== HttpStatusCode.Ok) {
        showErrorToast({
          name: 'get-customer-notifications',
          status: response.data.status,
          message: response.data.message,
          data: response.data.data,
          statusCode: response.status,
        });
      }

      return transformNotifications(response.data.data);
    },
  });
}
