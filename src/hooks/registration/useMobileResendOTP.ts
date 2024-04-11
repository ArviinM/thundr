import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  MobileResendOTPRequest,
  MobileValidationResponse,
} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';

export function useMobileResendOTP() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['mobile-resend-otp'],
    mutationFn: async (
      data: MobileResendOTPRequest,
    ): Promise<MobileValidationResponse> => {
      const response: AxiosResponse<BaseResponse<MobileValidationResponse>> =
        await axiosInstance.post('/auth/cognito-resend-sms-otp', data);

      if (response.status !== HttpStatusCode.Ok) {
        throw {
          name: 'mobile-resend',
          status: response.data.status,
          message: response.data.message,
          data: response.data.data,
        } as Error;
      }

      return response.data.data;
    },
    onError: showErrorToast,
  });
}
