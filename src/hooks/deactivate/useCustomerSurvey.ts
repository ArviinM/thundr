import {useMutation} from '@tanstack/react-query';
import {AxiosRequestConfig, AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  CustomerSurveyRequest,
  CustomerSurveyResponse,
} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';

export function useCustomerSurvey() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['customer-survey'],
    mutationFn: async (
      data: CustomerSurveyRequest,
    ): Promise<CustomerSurveyResponse[]> => {
      const response: AxiosResponse<BaseResponse<CustomerSurveyResponse[]>> =
        await axiosInstance.post('/customer/survey', [data]);

      if (response.status !== HttpStatusCode.Ok) {
        throw {
          name: 'customer-survey',
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
