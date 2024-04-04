import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  EmailVerificationRequest,
  EmailVerificationResponse,
} from '../../types/generated.ts';

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
        console.error(response.data);
        throw new Error('An error occurred with useEmailVerification');
      }

      console.log(response.data);
      return response.data.data;
    },
    onError: e => console.error(e),
  });
}
