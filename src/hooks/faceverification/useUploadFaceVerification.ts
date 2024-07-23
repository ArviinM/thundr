import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {BaseResponse} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';

export function useUploadFaceVerification() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['upload-face-verification'],
    mutationFn: async (data: {
      sub: string;
      photoPath: string;
    }): Promise<string> => {
      let formData = new FormData();

      formData.append('sub', data.sub);
      formData.append('sub', data.photoPath);

      const response: AxiosResponse<BaseResponse<string>> =
        await axiosInstance.post('/face-verification/verify', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

      if (response.status !== HttpStatusCode.Ok) {
        throw {
          name: 'upload-face-verification',
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
