import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  PasswordCreationRequest,
  PasswordCreationResponse,
} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';

export function usePasswordCreation() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['password-creation'],
    mutationFn: async (
      data: PasswordCreationRequest,
    ): Promise<PasswordCreationResponse> => {
      const response: AxiosResponse<BaseResponse<PasswordCreationResponse>> =
        await axiosInstance.post('/auth/validate-challenge-question', data);

      if (response.status !== HttpStatusCode.Ok) {
        throw {
          name: 'password-creation',
          status: response.data.status,
          message: response.data.message,
        } as Error;
      }

      console.log(response.data);
      return response.data.data;
    },
    onError: showErrorToast,
  });
}
