import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  EmailVerificationRequest,
  EmailVerificationResponse,
} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';

export function useEmailVerification() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['email-verification'],
    mutationFn: async (
      data: EmailVerificationRequest,
    ): Promise<EmailVerificationResponse> => {
      const response: AxiosResponse<BaseResponse<EmailVerificationResponse>> =
        await axiosInstance.post('/auth/validate-challenge-question', data);

      if (response.status !== HttpStatusCode.Ok) {
        throw {
          name: 'email-verification',
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
