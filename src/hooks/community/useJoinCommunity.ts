import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  CommunityJoinLeaveRequest,
} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';
export function useJoinCommunity() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['join-leave-community'],
    mutationFn: async (data: CommunityJoinLeaveRequest): Promise<boolean> => {
      const response: AxiosResponse<BaseResponse<boolean>> =
        await axiosInstance.post('/community/communities/join-leave', data);

      if (response.status !== HttpStatusCode.Ok) {
        throw {
          name: 'join-leave-community',
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
