import {useQuery} from '@tanstack/react-query';
import {AxiosRequestConfig, AxiosResponse, HttpStatusCode} from 'axios';
import {Platform} from 'react-native';
import {useAxiosWithAuth} from './api/useAxiosWithAuth.ts';

export function useGetMatchList(props: any) {
  const axiosInstance = useAxiosWithAuth();

  return useQuery({
    queryKey: ['get-package-add-on'],
    queryFn: async (): Promise<any> => {
      const config: AxiosRequestConfig<any> = {
        params: {sub: props},
      };

      const response: AxiosResponse<any> = await axiosInstance.get(
        '/match/match',
        config,
      );

      return response.data.data;
    },
  });
}
