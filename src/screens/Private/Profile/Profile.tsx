// import React from 'react';
// import {ActivityIndicator, Text, View, TouchableOpacity} from 'react-native';
// import {useAuth} from '../../../providers/Auth.tsx';
// import {useGetCustomerProfile} from '../../../hooks/profile/useGetCustomerProfile.ts';
// import {COLORS} from '../../../constants/commons.ts';
// import {Loading} from '../../../components/shared/Loading.tsx';
// import {scale} from '../../../utils/utils.ts';
// import {Image} from 'expo-image';
// import {calculateAge} from '../../../components/Home/utils.ts';
// import {VerificationBadge} from '../../../assets/images/VerificationBadge.tsx';
// import {truncateChatPreview} from '../Chat/chatUtils.ts';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import {PencilIcon} from '../../../assets/images/PencilIcon.tsx';
// import {useNavigation} from '@react-navigation/native';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {RootNavigationParams} from '../../../constants/navigator.ts';
//
// const Profile = () => {
//   const auth = useAuth();
//   const navigation =
//     useNavigation<NativeStackNavigationProp<RootNavigationParams>>();
//
//   const customerProfile = useGetCustomerProfile({
//     sub: auth.authData?.sub || '',
//   });
//
//   return (
//     <SafeAreaView
//       style={{flex: 1, backgroundColor: COLORS.white}}
//       edges={['right', 'left']}>
//       <View
//         style={{
//           flex: 1,
//           backgroundColor: COLORS.white,
//           paddingHorizontal: scale(16),
//           paddingVertical: scale(16),
//         }}>
//         {customerProfile.isPending && customerProfile.isLoading ? (
//           <ActivityIndicator animating={true} size={'small'} />
//         ) : customerProfile.isRefetching ? (
//           <Loading />
//         ) : (
//           customerProfile.data && (
//             <View style={{backgroundColor: COLORS.white}}>
//               {/* Customer Information Header */}
//               <View style={{flexDirection: 'row', gap: scale(10)}}>
//                 <Image
//                   source={{
//                     uri: customerProfile.data.customerPhoto[0].photoUrl,
//                   }}
//                   style={{
//                     height: scale(77),
//                     width: scale(77),
//                     borderRadius: scale(50),
//                   }}
//                 />
//                 <View style={{flex: 1}}>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       flexWrap: 'wrap',
//                     }}>
//                     <Text
//                       style={{
//                         fontFamily: 'Montserrat-Bold',
//                         fontSize: scale(19),
//                         color: COLORS.black,
//                       }}>
//                       {customerProfile.data.name},{' '}
//                       {calculateAge(customerProfile.data.birthday)}
//                     </Text>
//                     <View style={{paddingHorizontal: scale(6)}}>
//                       {customerProfile.data.faceVerificationState ===
//                         'VERIFIED' && <VerificationBadge />}
//                     </View>
//                   </View>
//                   <Text
//                     style={{
//                       fontFamily: 'Montserrat-Regular',
//                       fontSize: scale(11),
//                       color: COLORS.black,
//                     }}>
//                     {customerProfile.data.customerDetails.work},{' '}
//                     {customerProfile.data.customerDetails.pronouns}
//                   </Text>
//                   <Text
//                     style={{
//                       fontFamily: 'Montserrat-Medium',
//                       fontSize: scale(13),
//                       color: COLORS.black,
//                     }}>
//                     {truncateChatPreview(
//                       customerProfile.data.customerDetails.bio,
//                       36,
//                     )}
//                   </Text>
//                   <View style={{paddingVertical: scale(6)}}>
//                     <TouchableOpacity
//                       onPress={() =>
//                         navigation.push('EditProfile', customerProfile.data)
//                       }
//                       style={{
//                         backgroundColor: COLORS.primary1,
//                         width: scale(100),
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                         justifyContent: 'space-around',
//                         gap: scale(6),
//                         paddingHorizontal: scale(10),
//                         paddingVertical: scale(2),
//                         borderRadius: scale(7),
//                       }}>
//                       <PencilIcon />
//                       <Text
//                         style={{
//                           color: COLORS.white,
//                           fontFamily: 'Montserrat-Medium',
//                         }}>
//                         Edit profile
//                       </Text>
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               </View>
//             </View>
//           )
//         )}
//       </View>
//     </SafeAreaView>
//   );
// };
//
// export default Profile;

import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../../constants/commons.ts';
import CreatePostBar from '../../../components/Community/CreatePostBar.tsx';
import {useCommunity} from '../../../providers/Community.tsx';
import {Loading} from '../../../components/shared/Loading.tsx';
import {FlashList} from '@shopify/flash-list';
import {FeedResponse} from '../../../types/generated.ts';
import PostItem from '../../../components/Community/PostItem.tsx';
import {useGetLatestPosts} from '../../../hooks/community/useGetLatestPosts.ts';
import {useAuth} from '../../../providers/Auth.tsx';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useNavigation, useScrollToTop} from '@react-navigation/native';
import {useGetMyPosts} from '../../../hooks/community/useGetMyPosts.ts';
import {useGetCustomerProfile} from '../../../hooks/profile/useGetCustomerProfile.ts';
import {scale} from '../../../utils/utils.ts';
import {Image} from 'expo-image';
import {calculateAge} from '../../../components/Home/utils.ts';
import {VerificationBadge} from '../../../assets/images/VerificationBadge.tsx';
import {truncateChatPreview} from '../Chat/chatUtils.ts';
import navigation from '../../../navigation';
import {PencilIcon} from '../../../assets/images/PencilIcon.tsx';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootNavigationParams} from '../../../constants/navigator.ts';

const Profile = () => {
  const [firstSnowflakeId, setFirstSnowflakeId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const {loading} = useCommunity();
  const {authData} = useAuth();
  const tabBarHeight = useBottomTabBarHeight();
  const scrollRef = React.useRef(null);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootNavigationParams>>();

  useScrollToTop(scrollRef);

  const myPosts = useGetMyPosts({
    sub: authData?.sub || '',
    beforeId: undefined,
    limit: 10,
  });

  const customerProfile = useGetCustomerProfile({
    sub: authData?.sub || '',
  });

  const keyExtractor = (item: FeedResponse) =>
    `${item.snowflakeId}-${item.customerName}`;

  const renderItem = useCallback(
    ({item, index}: {item: FeedResponse; index: any | null | undefined}) => {
      return (
        <>
          {item.referenceType !== 'REPOST' && (
            <PostItem
              key={`feed-post-${item.snowflakeId}-${item.sub}-${index}`}
              post={item}
            />
          )}
          {item.referenceType === 'REPOST' && item.referencedPost && (
            <PostItem
              key={`feed-repost-${item.snowflakeId}-${item.sub}-${index}-${item.customerName}`}
              post={item.referencedPost}
              isRepostedPost
              postSub={item.sub}
            />
          )}
        </>
      );
    },
    [],
  );

  const loadMorePosts = async () => {
    if (
      myPosts.isLoading ||
      myPosts.isFetchingNextPage ||
      !myPosts.hasNextPage
    ) {
      return;
    }

    const currentFirstMessageId = myPosts.data?.pages[0][0]?.snowflakeId;

    if (currentFirstMessageId !== firstSnowflakeId) {
      setFirstSnowflakeId(firstSnowflakeId as string);
      return;
    }

    await myPosts.fetchNextPage();
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await myPosts.refetch();
    } catch (error) {
      console.error('Error refreshing feed:', error);
    } finally {
      setRefreshing(false);
    }
  }, [myPosts]);

  useEffect(() => {
    if (myPosts.data?.pages[0][0]?.snowflakeId) {
      setFirstSnowflakeId(myPosts.data.pages[0][0].snowflakeId as string);
    }
  }, [myPosts.data]);

  if (loading || myPosts.isLoading) {
    return <Loading />;
  }

  const ProfileHeader = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
          paddingHorizontal: scale(16),
          paddingVertical: scale(8),
        }}>
        {customerProfile.isPending && customerProfile.isLoading ? (
          <ActivityIndicator animating={true} size={'small'} />
        ) : customerProfile.isRefetching ? (
          <Loading />
        ) : (
          customerProfile.data && (
            <View style={{backgroundColor: COLORS.white}}>
              {/* Customer Information Header */}
              <View style={{flexDirection: 'row', gap: scale(10)}}>
                <Image
                  source={{
                    uri: customerProfile.data.customerPhoto[0].photoUrl,
                  }}
                  style={{
                    height: scale(77),
                    width: scale(77),
                    borderRadius: scale(50),
                  }}
                />
                <View style={{flex: 1}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Bold',
                        fontSize: scale(19),
                        color: COLORS.black,
                      }}>
                      {customerProfile.data.name},{' '}
                      {calculateAge(customerProfile.data.birthday)}
                    </Text>
                    <View style={{paddingHorizontal: scale(6)}}>
                      {customerProfile.data.faceVerificationState ===
                        'VERIFIED' && <VerificationBadge />}
                    </View>
                  </View>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Regular',
                      fontSize: scale(11),
                      color: COLORS.black,
                    }}>
                    {customerProfile.data.customerDetails.work},{' '}
                    {customerProfile.data.customerDetails.pronouns}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Medium',
                      fontSize: scale(13),
                      color: COLORS.black,
                    }}>
                    {truncateChatPreview(
                      customerProfile.data.customerDetails.bio,
                      36,
                    )}
                  </Text>
                  <View style={{paddingVertical: scale(6)}}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.push('EditProfile', customerProfile.data)
                      }
                      style={{
                        backgroundColor: COLORS.primary1,
                        width: scale(100),
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        gap: scale(6),
                        paddingHorizontal: scale(10),
                        paddingVertical: scale(2),
                        borderRadius: scale(7),
                      }}>
                      <PencilIcon />
                      <Text
                        style={{
                          color: COLORS.white,
                          fontFamily: 'Montserrat-Medium',
                        }}>
                        Edit profile
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Bold',
                    color: COLORS.primary1,
                  }}>
                  Posts
                </Text>
              </View>
            </View>
          )
        )}
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: COLORS.white}}
      edges={['right', 'left']}>
      <FlashList
        ref={scrollRef}
        renderItem={renderItem}
        data={myPosts.data?.pages.flatMap(page => page) || []}
        estimatedItemSize={286}
        ListHeaderComponent={<ProfileHeader />}
        ListFooterComponent={<View style={{paddingBottom: tabBarHeight}} />}
        keyExtractor={keyExtractor}
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.1}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        overScrollMode={'always'}
        alwaysBounceVertical
      />
    </SafeAreaView>
  );
};

export default Profile;
