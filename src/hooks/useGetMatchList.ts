import {useQuery} from '@tanstack/react-query';
import {AxiosRequestConfig, AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from './api/useAxiosWithAuth.ts';
import {showErrorToast} from '../utils/toast/errorToast.ts';

export function useGetMatchList(props: any) {
  const axiosInstance = useAxiosWithAuth();

  return useQuery({
    queryKey: ['get-match-list', props],
    enabled: false,
    queryFn: async (): Promise<any> => {
      const config: AxiosRequestConfig<any> = {
        params: {sub: props},
      };

      const response: AxiosResponse<any> = await axiosInstance.get(
        '/match/match',
        config,
      );

      if (response.status !== HttpStatusCode.Ok) {
        showErrorToast({
          name: 'get-match-list',
          status: response.data.status,
          message: response.data.message,
        });
      }

      return response.data.data;
    },
  });
}
