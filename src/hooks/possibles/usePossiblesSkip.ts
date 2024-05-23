import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {BaseResponse, PossiblesSkipRequest} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';

export function usePossiblesSkip() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['customer-possibles-skip'],
    mutationFn: async (data: PossiblesSkipRequest): Promise<any> => {
      const response: AxiosResponse<BaseResponse<any>> =
        await axiosInstance.post('/match/v2/customer-possible/skip', data);

      if (response.status !== HttpStatusCode.Ok) {
        throw {
          name: 'customer-possibles-skip',
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
