import React, {useCallback, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../../../constants/commons.ts';
import {useGetUserCommunityForums} from '../../../hooks/community/useGetUserCommunityForums.ts';
import {useAuth} from '../../../providers/Auth.tsx';
import {RefreshControl, ScrollView, Text, View} from 'react-native';
import {scale} from '../../../utils/utils.ts';
import {FlashList} from '@shopify/flash-list';
import {GetUserCommunityForumsResponse} from '../../../types/generated.ts';
import CommunityItem from '../../../components/Community/CommunityItem.tsx';
import {Loading} from '../../../components/shared/Loading.tsx';
import {useGetAvailableCommunityForums} from '../../../hooks/community/useGetAvailableCommunityForums.ts';
import {NavigationProp} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootNavigationParams} from '../../../constants/navigator.ts';
import {useJoinCommunity} from '../../../hooks/community/useJoinCommunity.ts';
import {useQueryClient} from '@tanstack/react-query';
import {queryClient} from '../../../utils/queryClient.ts';

type CommunityListProps = StackScreenProps<
  RootNavigationParams,
  'CommunityDynamicForum'
>;

const CommunityLists: React.FC<CommunityListProps> = ({navigation}) => {
  const {authData} = useAuth();
  const [refreshing, setRefreshing] = useState(false); // Add refreshing state

  const getUserCommunityForums = useGetUserCommunityForums({
    sub: authData?.sub || '',
  });
  const getAvailableCommunityForums = useGetAvailableCommunityForums({
    sub: authData?.sub || '',
  });

  const joinCommunity = useJoinCommunity();
  const query = useQueryClient(queryClient);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([
      query.refetchQueries({queryKey: ['get-user-communities']}),
      query.refetchQueries({queryKey: ['get-available-communities']}),
    ]).then(() => {
      setRefreshing(false);
    });
  }, [query]);

  const renderItem = useCallback(
    ({item}: {item: GetUserCommunityForumsResponse}) => {
      if (!item.id) {
        return <></>;
      }

      if (item?.id.toString() === '1') {
        return <></>;
      }

      return (
        <CommunityItem
          communityId={item?.id.toString()}
          title={item.name}
          onPress={() =>
            navigation.navigate('CommunityDynamicForum', {communityData: item})
          }
          onPressJoin={async () => {
            if (authData) {
              await joinCommunity.mutateAsync({
                sub: authData.sub,
                communityId: item.id,
                joinState: !item.isJoined,
              });
              await query.invalidateQueries({
                queryKey: ['get-user-communities'],
              });
              await query.invalidateQueries({
                queryKey: ['get-available-communities'],
              });
            }
          }}
          isJoined={item.isJoined}
          profileImage={item.headerImage}
        />
      );
    },
    [authData, joinCommunity, navigation, query],
  );

  const renderItemAvailableCommunity = useCallback(
    ({item}: {item: GetUserCommunityForumsResponse}) => {
      if (!item.id) {
        return <></>;
      }

      // if (!!item.id && item.id.toString() === '1') {
      //   return <></>;
      // }
      //
      if (item.isJoined) {
        return <></>;
      }

      return (
        <CommunityItem
          communityId={item?.id.toString()}
          title={item.name}
          onPress={() =>
            navigation.navigate('CommunityDynamicForum', {communityData: item})
          }
          onPressJoin={async () => {
            if (authData) {
              await joinCommunity.mutateAsync({
                sub: authData.sub,
                communityId: item.id,
                joinState: !item.isJoined,
              });
              await query.invalidateQueries({
                queryKey: ['get-user-communities'],
              });
              await query.invalidateQueries({
                queryKey: ['get-available-communities'],
              });
            }
          }}
          isJoined={item.isJoined}
          profileImage={item.headerImage}
        />
      );
    },
    [authData, joinCommunity, navigation, query],
  );

  // Log the data to check if it's available
  if (
    getUserCommunityForums.isLoading ||
    getAvailableCommunityForums.isLoading
  ) {
    return <Loading />;
  }

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: COLORS.white}}
      edges={['right', 'left']}>
      <ScrollView
        style={{paddingVertical: scale(20)}}
        refreshControl={
          // Add RefreshControl here
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {getUserCommunityForums.data &&
          getUserCommunityForums.data?.length > 2 && (
            <View style={{flex: 1}}>
              <View
                style={{
                  paddingHorizontal: scale(18),
                  paddingVertical: scale(10),
                }}>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Semibold',
                    fontSize: scale(12),
                  }}>
                  My Communities
                </Text>
              </View>
              <FlashList
                renderItem={renderItem}
                data={getUserCommunityForums.data}
                estimatedItemSize={80}
                style={{flex: 1}}
              />
            </View>
          )}
        {getAvailableCommunityForums.data &&
          getAvailableCommunityForums.data?.length > 1 && (
            <View style={{flex: 1}}>
              <View
                style={{
                  paddingHorizontal: scale(18),
                  paddingVertical: scale(10),
                }}>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Semibold',
                    fontSize: scale(12),
                  }}>
                  Suggested Communities
                </Text>
              </View>
              <FlashList
                renderItem={renderItemAvailableCommunity}
                data={getAvailableCommunityForums.data}
                estimatedItemSize={80}
                style={{flex: 1}} // Make sure FlashList takes up remaining space
              />
            </View>
          )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CommunityLists;
