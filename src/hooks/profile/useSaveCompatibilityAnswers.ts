import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  CompatibilityAnswersRequest,
  CompatibilityAnswersResponse,
} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';

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
        throw {
          name: 'customer-create-profile',
          status: response.data.status,
          message: response.data.message,
          data: response.data.data,
        } as Error;
      }

      return response.data.data;
    },
    onError: showErrorToast,
  });
}
