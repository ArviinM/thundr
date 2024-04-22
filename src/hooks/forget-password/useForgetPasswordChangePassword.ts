import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  ForgetPasswordChangePasswordRequest,
  ForgetPasswordChangePasswordResponse,
} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';

export function useForgetPasswordChangePassword() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['forget-password-change-password'],
    mutationFn: async (
      data: ForgetPasswordChangePasswordRequest,
    ): Promise<ForgetPasswordChangePasswordResponse> => {
      const response: AxiosResponse<
        BaseResponse<ForgetPasswordChangePasswordResponse>
      > = await axiosInstance.post(
        '/auth/forget-password/change-password',
        data,
      );

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
