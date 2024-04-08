import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  CompatibilityAnswersRequest,
  CompatibilityAnswersResponse,
} from '../../types/generated.ts';

export function useSaveCompatibilityAnswers() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['customer-create-profile'],
    mutationFn: async (
      data: CompatibilityAnswersRequest,
    ): Promise<CompatibilityAnswersResponse> => {
      const response: AxiosResponse<
        BaseResponse<CompatibilityAnswersResponse>
      > = await axiosInstance.post('/customer/questions-answers', data);

      if (response.status !== HttpStatusCode.Ok) {
        console.error(response.data);
        throw new Error('An error occurred with useSaveCompatibilityAnswers');
      }

      return response.data.data;
    },
    onError: e => console.error(e),
  });
}
