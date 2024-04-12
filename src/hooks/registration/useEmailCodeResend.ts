import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  EmailCodeResendRequest,
  EmailValidationResponse,
} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';

export function useEmailCodeResend() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['email-code-resend'],
    mutationFn: async (
      data: EmailCodeResendRequest,
    ): Promise<EmailValidationResponse> => {
      const response: AxiosResponse<BaseResponse<EmailValidationResponse>> =
        await axiosInstance.post('/auth/cognito-resend-email-otp', data);

      if (response.status !== HttpStatusCode.Ok) {
        throw {
          name: 'email-code-resend',
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
