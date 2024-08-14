import React, {useCallback, useEffect, useState} from 'react';
import {
  Animated,
  Modal,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, width} from '../../../constants/commons.ts';
import {useCommunity} from '../../../providers/Community.tsx';
import {Loading} from '../../../components/shared/Loading.tsx';
import {FlashList} from '@shopify/flash-list';
import {CustomerData, FeedResponse} from '../../../types/generated.ts';
import PostItem from '../../../components/Community/PostItem.tsx';
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
import {PencilIcon} from '../../../assets/images/PencilIcon.tsx';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootNavigationParams} from '../../../constants/navigator.ts';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../../components/shared/Button.tsx';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ProfileCard from '../../../components/Home/ProfileCard.tsx';

const Profile = () => {
  const [firstSnowflakeId, setFirstSnowflakeId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const {loading} = useCommunity();
  const {authData} = useAuth();
  const tabBarHeight = useBottomTabBarHeight();
  const scrollRef = React.useRef(null);

  const navigation = useNavigation<StackNavigationProp<RootNavigationParams>>();

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

  if (loading || myPosts.isLoading || customerProfile.isLoading) {
    return <Loading />;
  }

  const [animation] = React.useState(new Animated.Value(0));

  const [isVisible, setIsVisible] = useState<boolean>(false);

  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: isVisible ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [animation, isVisible]);

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const scaleAnim = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.95, 1],
  });

  const profileCardModal = (customer: CustomerData) => {
    return (
      <Modal
        statusBarTranslucent
        transparent
        animationType="fade"
        visible={isVisible}
        onDismiss={() => setIsVisible(false)}
        onRequestClose={() => setIsVisible(false)}>
        <GestureHandlerRootView style={{flex: 1}}>
          <Animated.View
            style={[
              styles.container,
              {opacity, transform: [{scale: scaleAnim}]},
            ]}>
            <View style={[styles.bodyContainer, {marginBottom: 20}]}>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor: COLORS.secondary2,
                  },
                ]}
                onPress={() => setIsVisible(false)}>
                <Text
                  style={[styles.buttonText, {fontFamily: 'Montserrat-Bold'}]}>
                  Close
                </Text>
              </TouchableOpacity>
              <ProfileCard
                user={{
                  sub: '',
                  percent: '',
                  customerData: customer,
                }}
                possibles={false}
                isReport={true}
              />
            </View>
          </Animated.View>
        </GestureHandlerRootView>
      </Modal>
    );
  };

  const ProfileHeader = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
          paddingHorizontal: scale(16),
          paddingVertical: scale(8),
        }}>
        {customerProfile.data && (
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
                placeholder={customerProfile.data.customerPhoto[0].blurHash}
                transition={167}
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
                <View
                  style={{
                    paddingVertical: scale(6),
                    flexDirection: 'row',
                    gap: scale(6),
                  }}>
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
                        fontSize: scale(12),
                      }}>
                      Edit profile
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setIsVisible(true)}
                    style={{
                      backgroundColor: COLORS.secondary2,
                      width: scale(100),
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      gap: scale(6),
                      paddingHorizontal: scale(10),
                      paddingVertical: scale(2),
                      borderRadius: scale(7),
                    }}>
                    <Text
                      style={{
                        color: COLORS.white,
                        fontFamily: 'Montserrat-Medium',
                        fontSize: scale(12),
                      }}>
                      View profile
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{paddingVertical: scale(10)}}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Bold',
                  color: COLORS.primary1,
                }}>
                Posts
              </Text>
            </View>
            <LinearGradient
              colors={['#E53053', '#FBB138']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={{
                paddingVertical: scale(16),
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 16,
              }}>
              <Text
                style={{
                  fontFamily: 'ClimateCrisis-Regular',
                  fontSize: scale(18),
                  color: COLORS.white,
                }}>
                THUNDR BOLT
              </Text>
              <Text
                style={{
                  fontFamily: 'Montserrat-Medium',
                  fontSize: scale(13),
                  color: COLORS.white,
                  alignSelf: 'center',
                }}>
                Paid subscription para sa mga kabog.{'\n'}Unlock exclusive
                access to all features
              </Text>
              <Button
                onPress={() =>
                  navigation.push('ThundrBoltModal', {isModal: false})
                }
                text="SUBSCRIBE"
                buttonStyle={{
                  backgroundColor: COLORS.white,
                  paddingHorizontal: scale(30),
                  paddingVertical: scale(8),
                  marginTop: scale(10),
                  borderRadius: 20,
                }}
                textStyle={{
                  fontFamily: 'Montserrat-Bold',
                  fontSize: scale(12),
                }}
              />
            </LinearGradient>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: COLORS.white}}
      edges={['right', 'left']}>
      {customerProfile.isLoading ? (
        <Loading />
      ) : (
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
      )}
      {customerProfile.data && profileCardModal(customerProfile.data)}
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  backButton: {alignItems: 'flex-start'},
  backImage: {alignSelf: 'flex-start', width: 26, height: 26, aspectRatio: 1},
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    justifyContent: 'center',
  },
  bodyContainer: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 20,
    margin: 20,
    width: width / 1.07,
    height: '66%',
  },
  button: {
    position: 'absolute',
    top: scale(-46),
    right: 0,
    zIndex: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: scale(13),
    color: COLORS.black,
  },
});
