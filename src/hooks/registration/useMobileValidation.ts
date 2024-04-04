import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  MobileValidationRequest,
  MobileValidationResponse,
} from '../../types/generated.ts';

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
        console.error(response.data);
        throw new Error('An error occurred with useSignInUser');
      }
      console.log(response.data);
      return response.data.data;
    },
    onError: e => console.error(e),
  });
}
