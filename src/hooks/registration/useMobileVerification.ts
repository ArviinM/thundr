import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  MobileVerificationRequest,
  MobileVerificationResponse,
} from '../../types/generated.ts';

export function useMobileVerification() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['mobile-verification'],
    mutationFn: async (
      data: MobileVerificationRequest,
    ): Promise<MobileVerificationResponse> => {
      const response: AxiosResponse<BaseResponse<MobileVerificationResponse>> =
        await axiosInstance.post('/auth/validate-challenge-question', data);

      if (response.status !== HttpStatusCode.Ok) {
        console.error(response.data);
        throw new Error('An error occurred with useMobileVerification');
      }

      console.log(response.data);
      return response.data.data;
    },
    onError: e => console.error(e),
  });
}
