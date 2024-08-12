import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl, View} from 'react-native';
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
import {useScrollToTop} from '@react-navigation/native';

const Feed = () => {
  const [firstSnowflakeId, setFirstSnowflakeId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const {loading} = useCommunity();
  const {authData} = useAuth();
  const tabBarHeight = useBottomTabBarHeight();
  const scrollRef = React.useRef(null);

  useScrollToTop(scrollRef);

  const community = useGetLatestPosts({
    sub: authData?.sub || '',
    beforeId: undefined,
    limit: 10,
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

  if (loading || community.isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: COLORS.white}}
      edges={['right', 'left']}>
      <FlashList
        ref={scrollRef}
        renderItem={renderItem}
        data={community.data?.pages.flatMap(page => page) || []}
        estimatedItemSize={286}
        ListHeaderComponent={<CreatePostBar actionTitle={'Share a post'} />}
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

export default Feed;
