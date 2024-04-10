import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  MobileVerificationRequest,
  MobileVerificationResponse,
} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';

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
        throw {
          name: 'mobile-verification',
          status: response.data.status,
          message: response.data.message,
          data: response.data.data,
        } as Error;
      }

      console.log(response.data);
      return response.data.data;
    },
    onError: showErrorToast,
  });
}
