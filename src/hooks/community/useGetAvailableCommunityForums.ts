import {useQuery} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';
import {
  BaseResponse,
  GenericCustomerRequest,
  GetUserCommunityForumsResponse,
} from '../../types/generated.ts';

export function useGetAvailableCommunityForums(props: GenericCustomerRequest) {
  const axiosInstance = useAxiosWithAuth();

  return useQuery({
    enabled: true,
    staleTime: 60000,
    refetchOnMount: true,
    queryKey: ['get-available-communities'],
    queryFn: async (): Promise<GetUserCommunityForumsResponse[]> => {
      const response: AxiosResponse<
        BaseResponse<GetUserCommunityForumsResponse[]>
      > = await axiosInstance.get(
        `/community/communities/get-available-communities?sub=${props.sub}`,
      );

      if (response.status !== HttpStatusCode.Ok) {
        showErrorToast({
          name: 'get-available-communities',
          status: response.data.status,
          message: response.data.message,
          data: response.data,
          statusCode: response.status,
        });
      }

      // Transform the data to the desired format
      return response.data.data;
    },
  });
}
