import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  ForgetPasswordVerificationRequest,
  ForgetPasswordVerificationResponse,
} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';

export function useForgetPasswordVerification() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['forget-password-verification'],
    mutationFn: async (
      data: ForgetPasswordVerificationRequest,
    ): Promise<ForgetPasswordVerificationResponse> => {
      const response: AxiosResponse<
        BaseResponse<ForgetPasswordVerificationResponse>
      > = await axiosInstance.post('/auth/forget-password/verify-otp', data);

      if (response.status !== HttpStatusCode.Ok) {
        throw {
          name: 'forget-password-verification',
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
