import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  ForgetPasswordValidationRequest,
} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';

export function useForgetPasswordValidation() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['forget-password-validation'],
    mutationFn: async (
      data: ForgetPasswordValidationRequest,
    ): Promise<BaseResponse<null>> => {
      const response: AxiosResponse<BaseResponse<null>> =
        await axiosInstance.post('/auth/forget-password/validate-email', data);

      if (response.status !== HttpStatusCode.Ok) {
        throw {
          name: 'forget-password-validation',
          status: response.data.status,
          message: response.data.message,
          data: response.data.data,
          statusCode: response.status,
        } as Error;
      }

      return response.data;
    },
    onError: showErrorToast,
  });
}
