import {useMutation} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {
  BaseResponse,
  FeedResponse,
  PostRequest,
} from '../../types/generated.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';
import {checkFileExists} from '../../utils/utils.ts';

export function useCreatePost() {
  const axiosInstance = useAxiosWithAuth();

  return useMutation({
    mutationKey: ['create-post'],
    mutationFn: async (data: PostRequest): Promise<any> => {
      let formData = new FormData();

      formData.append('sub', data.sub);
      formData.append('content', data.content);
      formData.append('inCommunity', data.inCommunity.toString());

      if (data.media.length > 0) {
        // formData.append('media', data.media);
        for (const mediaItem of data.media) {
          // const index = data.attachments.indexOf(mediaItem);
          const fileUri = mediaItem.filePath;
          if (await checkFileExists(fileUri)) {
            formData.append('media', {
              uri: fileUri,
              type: mediaItem.fileType,
              name: fileUri.split('/').pop(),
            });
          } else {
            throw {
              name: 'create-post-media',
              status: 'null',
              message: 'File does not exist',
            } as Error;
          }
        }
      }

      console.log(formData);

      const response: AxiosResponse<BaseResponse<FeedResponse>> =
        await axiosInstance.post('/community/create-post', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      console.log(response.data.data);
      if (response.status !== HttpStatusCode.Ok) {
        throw {
          name: 'create-post',
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
