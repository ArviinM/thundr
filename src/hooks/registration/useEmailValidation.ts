import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  EmailValidationRequest,
  EmailValidationResponse,
} from '../../types/generated.ts';

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
        console.error(response.data);
        throw new Error('An error occurred with useEmailValidation');
      }
      console.log(response.data);
      return response.data.data;
    },
    onError: e => console.error(e),
  });
}
