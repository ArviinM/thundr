import {useQuery} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';

export function useGetStatus() {
  const axiosInstance = useAxiosWithAuth();

  return useQuery({
    queryKey: ['get-status'],
    queryFn: async (): Promise<any> => {
      const response: AxiosResponse<any> = await axiosInstance.get('/status');

      if (response.status === HttpStatusCode.ServiceUnavailable) {
        showErrorToast({
          name: 'get-status',
          status: response.data.status,
          message: response.data.message,
          data: response.data.data,
          statusCode: response.status,
        });
      }

      return {
        status: response.data.status,
        statusCode: response.status,
        current: response.data.current,
        isUpdate: response.data.isUpdate,
      };
    },
  });
}
