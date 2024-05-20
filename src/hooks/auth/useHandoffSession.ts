import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  HandoffSessionRequest,
  HandoffSessionResponse,
} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';

export function useHandoffSession() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['handoff-key'],
    mutationFn: async (
      data: HandoffSessionRequest,
    ): Promise<HandoffSessionResponse> => {
      const response: AxiosResponse<BaseResponse<HandoffSessionResponse>> =
        await axiosInstance.post('/auth/handoff/create', data);

      if (response.status !== HttpStatusCode.Ok) {
        throw {
          name: 'handoff-key',
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
