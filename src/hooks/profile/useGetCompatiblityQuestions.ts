import {useQuery} from '@tanstack/react-query';
import {AxiosRequestConfig, AxiosResponse} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  CompatibilityQuestion,
  CompatibilityQuestionsRequest,
} from '../../types/generated.ts';

export function useGetCompatibilityQuestions(
  props: CompatibilityQuestionsRequest,
) {
  const axiosInstance = useAxiosWithAuth();

  return useQuery({
    queryKey: ['customer-compatibility-questions', props],
    enabled: false,
    queryFn: async (): Promise<CompatibilityQuestion[]> => {
      const config: AxiosRequestConfig<CompatibilityQuestionsRequest> = {
        params: {sub: props.sub},
      };

      const response: AxiosResponse<BaseResponse<CompatibilityQuestion[]>> =
        await axiosInstance.get('/customer/question', config);

      if (response.data.error) {
        console.error(response.data);
        throw new Error('useGetCompatiblityQuestions encountered an error');
      }

      return response.data.data;
    },
  });
}
