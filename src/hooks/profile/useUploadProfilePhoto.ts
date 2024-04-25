import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {BaseResponse} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts'; // Adjust the type if needed

export function useUploadProfilePhoto() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['upload-profile-photo'],
    mutationFn: async (formData: FormData): Promise<BaseResponse<any>> => {
      const response: AxiosResponse<BaseResponse<any>> =
        await axiosInstance.post('/customer/photo-b64', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

      if (response.status !== HttpStatusCode.Ok) {
        throw {
          name: 'upload-profile-photo',
          status: response.data.status,
          message: response.data.message,
          statusCode: response.status,
        } as Error;
      }

      return response.data;
    },
    onError: showErrorToast,
  });
}
