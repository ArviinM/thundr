import {useQuery} from '@tanstack/react-query';
import {AxiosResponse, HttpStatusCode} from 'axios';
import {useAxiosWithAuth} from '../api/useAxiosWithAuth.ts';
import {showErrorToast} from '../../utils/toast/errorToast.ts';
import {
  BaseResponse,
  CommunityResponse,
  GenericCustomerRequest,
} from '../../types/generated.ts';

export function useGetUserCommunities(props: GenericCustomerRequest) {
  const axiosInstance = useAxiosWithAuth();

  return useQuery({
    queryKey: ['get-user-communities-dropdown'],
    queryFn: async (): Promise<Array<{label: string; value: string}>> => {
      const response: AxiosResponse<BaseResponse<CommunityResponse[]>> =
        await axiosInstance.get(
          `/community/communities/get-user-communities?sub=${props.sub}`,
        );

      if (response.status !== HttpStatusCode.Ok) {
        showErrorToast({
          name: 'get-user-communities-dropdown',
          status: response.data.status,
          message: response.data.message,
          data: response.data,
          statusCode: response.status,
        });
      }

      // Transform the data to the desired format
      return response.data.data.map(community => {
        if (community.name === 'Matches') {
          return {label: community.name, value: '1.3'};
        }
        return {label: community.name, value: community.id.toString()};
      });
    },
  });
}
