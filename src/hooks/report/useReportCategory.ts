import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {BaseResponse, ReportCustomerRequest} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';

export function useReportCategory() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['customer-report'],
    mutationFn: async (data: ReportCustomerRequest): Promise<any> => {
      const response: AxiosResponse<BaseResponse<any>> =
        await axiosInstance.post('/report/customer', data);

      if (response.status !== HttpStatusCode.Ok) {
        throw {
          name: 'customer-report',
          status: response.data.status,
          message: response.data.message,
          data: response.data.data,
          statusCode: response.status,
        } as Error;
      }
      console.log(response.data.data);
      return response.data.data;
    },
    onError: showErrorToast,
  });
}
