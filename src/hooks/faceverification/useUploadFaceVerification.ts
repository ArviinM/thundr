import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {BaseResponse} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';
import {checkFileExists} from '../../utils/utils.ts';
import {Platform} from 'react-native';

export function useUploadFaceVerification() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['upload-face-verification'],
    mutationFn: async (data: {
      sub: string;
      photoPath: string;
    }): Promise<string> => {
      let formData = new FormData();
      const fileUri = data.photoPath;

      formData.append('sub', data.sub);
      console.log(`file://${fileUri}`);
      if (
        await checkFileExists(
          Platform.OS === 'ios' ? fileUri : `file://${fileUri}`,
        )
      ) {
        formData.append('media', {
          uri: Platform.OS === 'ios' ? fileUri : `file://${fileUri}`,
          type: 'image/jpg',
          name: fileUri.split('/').pop(),
        });
      } else {
        throw {
          name: 'upload-face-verification',
          status: 'null',
          message: 'File does not exist',
        } as Error;
      }

      console.log(JSON.stringify(formData, null, 2));

      const response: AxiosResponse<BaseResponse<string>> =
        await axiosInstance.post('/face-verification/verify', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

      console.log(JSON.stringify(response, null, 2));

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
