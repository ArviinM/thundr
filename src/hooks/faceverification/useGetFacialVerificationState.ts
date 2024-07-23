import {useQuery} from '@tanstack/react-query';
import {AxiosRequestConfig, AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';
import {
  BaseResponse,
  FacialVerificationState,
  GenericCustomerRequest,
} from '../../types/generated.ts';

export function useGetFacialVerificationState(props: GenericCustomerRequest) {
  const axiosInstance = useAxiosWithAuth();

  return useQuery({
    queryKey: ['get-facial-verification-state', props.sub],
    queryFn: async (): Promise<FacialVerificationState> => {
      const config: AxiosRequestConfig<GenericCustomerRequest> = {
        params: {sub: props.sub},
      };
      const response: AxiosResponse<BaseResponse<FacialVerificationState>> =
        await axiosInstance.get('/face-verification/status', config);

      if (response.status !== HttpStatusCode.Ok) {
        showErrorToast({
          name: 'get-facial-verification-state',
          status: response.data.status,
          message: response.data.message,
          data: response.data.data,
          statusCode: response.status,
        });
      }

      return response.data.data;
    },
  });
}
