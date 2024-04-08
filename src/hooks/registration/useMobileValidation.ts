import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  MobileValidationRequest,
  MobileValidationResponse,
} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';

export function useMobileValidation() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['mobile-validation'],
    mutationFn: async (
      data: MobileValidationRequest,
    ): Promise<MobileValidationResponse> => {
      const response: AxiosResponse<BaseResponse<MobileValidationResponse>> =
        await axiosInstance.post('/auth/cognito-create-user', data);

      if (response.status !== HttpStatusCode.Ok) {
        throw {
          name: 'mobile-validation',
          status: response.data.status,
          message: response.data.message,
        } as Error;
      }

      return response.data.data;
    },
    onError: showErrorToast,
  });
}
