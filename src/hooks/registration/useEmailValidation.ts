import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  EmailValidationRequest,
  EmailValidationResponse,
} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';

export function useEmailValidation() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['email-validation'],
    mutationFn: async (
      data: EmailValidationRequest,
    ): Promise<EmailValidationResponse> => {
      const response: AxiosResponse<BaseResponse<EmailValidationResponse>> =
        await axiosInstance.post('/auth/email-code', data);

      if (response.status !== HttpStatusCode.Ok) {
        throw {
          name: 'email-validation',
          status: response.data.status,
          message: response.data.message,
        } as Error;
      }

      return response.data.data;
    },
    onError: showErrorToast,
  });
}
