import {useQuery} from '@tanstack/react-query';
import {AxiosRequestConfig, AxiosResponse} from 'axios';
import {useAxiosWithAuth} from './api/useAxiosWithAuth.ts';

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

      if (response.data.error) {
        console.error(response.data);
        throw new Error('useGetMatchList encountered and error');
      }

      return response.data.data;
    },
  });
}
