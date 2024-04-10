import {useQuery} from '@tanstack/react-query';
import {AxiosRequestConfig, AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  CompatibilityQuestion,
  CompatibilityQuestionsRequest,
} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';

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

      if (response.status !== HttpStatusCode.Ok) {
        showErrorToast({
          name: 'customer-compatibility-questions',
          status: response.data.status,
          message: response.data.message,
          data: response.data.data,
        });
      }

      return response.data.data;
    },
  });
}
