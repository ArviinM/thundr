import {useMutation} from '@tanstack/react-query';
import {AxiosRequestConfig, AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  CustomerDeleteProfilePhotoRequest,
} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';

export function useRemoveProfilePhoto() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['remove-profile-photo'],
    mutationFn: async (
      data: CustomerDeleteProfilePhotoRequest,
    ): Promise<BaseResponse<null>> => {
      const config: AxiosRequestConfig<CustomerDeleteProfilePhotoRequest> = {
        params: {
          sub: data.sub,
          id: data.id,
        },
      };

      const response: AxiosResponse<BaseResponse<any>> =
        await axiosInstance.post('/customer/photo/delete', null, config);

      if (response.status !== HttpStatusCode.Ok) {
        throw {
          name: 'upload-profile-photo',
          status: response.data.status,
          message: response.data.message,
          statusCode: response.status,
        } as Error;
      }

      return response.data.data;
    },
    onError: showErrorToast,
  });
}
