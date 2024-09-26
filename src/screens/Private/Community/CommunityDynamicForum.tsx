import React, {useCallback, useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../../../constants/commons.ts';
import {
  Text,
  View,
  Animated,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {scale} from '../../../utils/utils.ts';
import {
  FeedResponse,
  GetUserCommunityForumsResponse,
} from '../../../types/generated.ts';
import {RootNavigationParams} from '../../../constants/navigator.ts';
import {StackScreenProps} from '@react-navigation/stack';
import {Image} from 'expo-image';
import {Loading} from '../../../components/shared/Loading.tsx';
import {useCommunity} from '../../../providers/Community.tsx';
import {useAuth} from '../../../providers/Auth.tsx';
import {useGetLatestPosts} from '../../../hooks/community/useGetLatestPosts.ts';
import PostItem from '../../../components/Community/PostItem.tsx';
import CreatePostBar from '../../../components/Community/CreatePostBar.tsx';
import {FlashList} from '@shopify/flash-list';
import {useJoinCommunity} from '../../../hooks/community/useJoinCommunity.ts';
import {NavigationProp, useNavigation} from '@react-navigation/native';

export type CommunityDynamicForumProps = StackScreenProps<
  RootNavigationParams,
  'CommunityDynamicForum'
>;

const Header_Max_Height = 240;
const Header_Min_Height = 120;
const Scroll_Distance = Header_Max_Height - Header_Min_Height;

const DynamicHeader = ({
  value,
  headerData,
}: {
  value: any;
  headerData: GetUserCommunityForumsResponse | undefined;
}) => {
  const animatedHeaderHeight = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: 'clamp',
  });

  const animateOpacity = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const animateSlightOpacity = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [1, 0.87],
    extrapolate: 'clamp',
  });

  const animateReverseOpacity = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const joinCommunity = useJoinCommunity();
  const {authData} = useAuth();
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();

  return (
    <Animated.View
      style={[
        styles.header,
        {
          height: animatedHeaderHeight,
        },
      ]}>
      <Animated.Image
        source={{uri: headerData?.headerImage}}
        style={[
          styles.headerImage,
          {
            height: animatedHeaderHeight, // Make the image's height dynamic
            opacity: animateSlightOpacity, // Make the image's height dynamic
          },
        ]}
      />
      <Animated.View
        style={[styles.container, {opacity: animateReverseOpacity}]}>
        <View style={{marginVertical: scale(20)}}>
          <Text style={styles.titleMid}>{headerData?.name}</Text>
        </View>
      </Animated.View>
      <Animated.View style={[styles.container, {opacity: animateOpacity}]}>
        <Image
          source={{uri: headerData?.communityIcon}}
          style={{
            height: scale(80),
            width: scale(80),
            position: 'absolute',
            zIndex: 100,
            bottom: scale(16),
            left: scale(16),
          }}
        />
        <View style={{marginLeft: scale(100), marginVertical: scale(8)}}>
          <Text style={styles.title}>{headerData?.name}</Text>
        </View>
        <View
          style={{
            paddingLeft: scale(100),
            height: scale(40),
            width: '100%',
            backgroundColor: headerData?.brandingColors,
            flexDirection: 'row',
            alignItems: 'center',
            gap: scale(10),
            // justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={async () => {
              await joinCommunity.mutateAsync({
                sub: authData?.sub || '',
                communityId: headerData?.id as number,
                joinState: !headerData?.isJoined,
              });
              navigation.goBack();
            }}
            style={{
              paddingHorizontal: scale(10),
              paddingVertical: scale(4),
              // marginVertical: scale(8),
              borderRadius: scale(20),
              backgroundColor: COLORS.white,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={[styles.buttonText, {color: headerData?.brandingColors}]}>
              {headerData?.isJoined ? 'JOINED' : 'JOIN'}
            </Text>
          </TouchableOpacity>
          <Text
            style={[
              {
                color: COLORS.white,
                opacity: 0.67,
                fontFamily: 'Montserrat-Regular',
              },
            ]}>
            {headerData?.memberCount} members
          </Text>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const CommunityDynamicForum: React.FC<CommunityDynamicForumProps> = ({
  route,
}) => {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const [activeTab, setActiveTab] = useState('Feed'); // State to manage active tab
  const routeData = route.params;

  const [firstSnowflakeId, setFirstSnowflakeId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const {loading} = useCommunity();
  const {authData} = useAuth();
  // const tabBarHeight = useBottomTabBarHeight();

  const community = useGetLatestPosts({
    sub: authData?.sub || '',
    beforeId: undefined,
    limit: 10,
    communityId: routeData.communityData?.id,
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
              isJoined={routeData.communityData?.isJoined}
            />
          )}
          {item.referenceType === 'REPOST' && item.referencedPost && (
            <PostItem
              key={`feed-repost-${item.snowflakeId}-${item.sub}-${index}-${item.customerName}`}
              post={item.referencedPost}
              isRepostedPost
              postSub={item.sub}
              originalPoster={item.customerName}
              isJoined={routeData.communityData?.isJoined}
            />
          )}
        </>
      );
    },
    [],
  );

  const loadMorePosts = async () => {
    if (
      community.isLoading ||
      community.isFetchingNextPage ||
      !community.hasNextPage
    ) {
      return;
    }

    const currentFirstMessageId = community.data?.pages[0][0]?.snowflakeId;

    if (currentFirstMessageId !== firstSnowflakeId) {
      setFirstSnowflakeId(firstSnowflakeId as string);
      return;
    }

    await community.fetchNextPage();
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await community.refetch();
    } catch (error) {
      console.error('Error refreshing feed:', error);
    } finally {
      setRefreshing(false);
    }
  }, [community]);

  useEffect(() => {
    if (community.data?.pages[0][0]?.snowflakeId) {
      setFirstSnowflakeId(community.data.pages[0][0].snowflakeId as string);
    }
  }, [community.data]);

  if (!routeData) {
    return <Loading />;
  }

  if (loading || community.isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: COLORS.white}}
      edges={['right', 'left']}>
      <>
        <DynamicHeader
          value={scrollOffsetY}
          headerData={routeData.communityData}
        />
        {/* Tab View */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab]}
            onPress={() => setActiveTab('Feed')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'Feed' && {
                  color: routeData?.communityData?.brandingColors,
                },
              ]}>
              Feed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab]}
            onPress={() => setActiveTab('About')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'About' && {
                  color: routeData?.communityData?.brandingColors,
                },
              ]}>
              About
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content based on active tab */}
        {activeTab === 'Feed' ? (
          <View style={{flex: 1}}>
            <FlashList
              // ref={scrollRef}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {y: scrollOffsetY}}}],
                {useNativeDriver: false},
              )}
              renderItem={renderItem}
              data={community.data?.pages.flatMap(page => page) || []}
              estimatedItemSize={103}
              ListHeaderComponent={
                routeData?.communityData?.isJoined ? (
                  <CreatePostBar
                    actionTitle={"What's the tea?"}
                    communityTitle={routeData.communityData?.id}
                  />
                ) : (
                  <></>
                )
              }
              ListFooterComponent={<View style={{paddingBottom: scale(100)}} />}
              keyExtractor={keyExtractor}
              onEndReached={loadMorePosts}
              onEndReachedThreshold={0.1}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              overScrollMode={'always'}
              alwaysBounceVertical
            />
          </View>
        ) : (
          <View style={styles.aboutContainer}>
            <Text>About</Text>
          </View>
        )}
      </>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    backgroundColor: COLORS.black,
  },
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
  },
  title: {
    color: '#fff',
    fontSize: scale(20),
    fontFamily: 'Montserrat-Black',
  },
  titleMid: {
    color: '#fff',
    fontSize: scale(16),
    fontFamily: 'Montserrat-Black',
    textAlign: 'center',
  },
  buttonText: {
    fontSize: scale(11),
    fontFamily: 'Montserrat-Semibold',
  },
  card: {
    height: 100,
    backgroundColor: '#E6DDC4',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  subtitle: {
    color: '#181D31',
    fontWeight: 'bold',
  },
  headerImage: {
    width: '100%', // Make sure the image covers the entire header width
    resizeMode: 'cover', // Adjust how the image fits within the container
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: scale(12),
  },
  tabText: {
    fontSize: scale(12),
    fontFamily: 'Montserrat-SemiBold',
  },
  aboutContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CommunityDynamicForum;
