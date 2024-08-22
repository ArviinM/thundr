import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl, View} from 'react-native';
import {COLORS} from '../../../constants/commons.ts';
import CreatePostBar from '../../../components/Community/CreatePostBar.tsx';
import {useCommunity} from '../../../providers/Community.tsx';
import {Loading} from '../../../components/shared/Loading.tsx';
import {FlashList} from '@shopify/flash-list';
import {FeedResponse} from '../../../types/generated.ts';
import PostItem from '../../../components/Community/PostItem.tsx';
import {useAuth} from '../../../providers/Auth.tsx';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useScrollToTop} from '@react-navigation/native';
import {useGetMatchesPosts} from '../../../hooks/community/useGetMatchesPosts.ts';

const Matches = () => {
  const [firstSnowflakeId, setFirstSnowflakeId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const {loading} = useCommunity();
  const {authData} = useAuth();
  const tabBarHeight = useBottomTabBarHeight();
  const scrollRef = React.useRef(null);

  useScrollToTop(scrollRef);

  const matchesPosts = useGetMatchesPosts({
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
      matchesPosts.isLoading ||
      matchesPosts.isFetchingNextPage ||
      !matchesPosts.hasNextPage
    ) {
      return;
    }

    const currentFirstMessageId = matchesPosts.data?.pages[0][0]?.snowflakeId;

    if (currentFirstMessageId !== firstSnowflakeId) {
      setFirstSnowflakeId(firstSnowflakeId as string);
      return;
    }

    await matchesPosts.fetchNextPage();
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await matchesPosts.refetch();
    } catch (error) {
      console.error('Error refreshing feed:', error);
    } finally {
      setRefreshing(false);
    }
  }, [matchesPosts]);

  useEffect(() => {
    if (matchesPosts.data?.pages[0][0]?.snowflakeId) {
      setFirstSnowflakeId(matchesPosts.data.pages[0][0].snowflakeId as string);
    }
  }, [matchesPosts.data]);

  if (loading || matchesPosts.isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: COLORS.white}}
      edges={['right', 'left']}>
      <FlashList
        ref={scrollRef}
        renderItem={renderItem}
        data={matchesPosts.data?.pages.flatMap(page => page) || []}
        estimatedItemSize={500}
        ListHeaderComponent={
          <CreatePostBar actionTitle={"What's the tea?"} isMatchesTab />
        }
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

export default Matches;
