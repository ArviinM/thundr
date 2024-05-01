import {useMutation} from '@tanstack/react-query';
import {AxiosRequestConfig, AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  NotificationReadDeleteRequest,
  NotificationRequest,
} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';

export function useDeleteNotification() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['delete-notification'],
    mutationFn: async (
      data: NotificationReadDeleteRequest,
    ): Promise<string> => {
      const config: AxiosRequestConfig<NotificationRequest> = {
        params: {
          sub: data.sub,
          notificationId: data.notificationId,
        },
      };

      const response: AxiosResponse<BaseResponse<string>> =
        await axiosInstance.post(
          '/notification/delete-notification',
          null,
          config,
        );

      if (response.status !== HttpStatusCode.Ok) {
        throw {
          name: 'delete-notification',
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
