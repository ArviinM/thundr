import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl} from 'react-native';
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

const Feed = () => {
  const [firstSnowflakeId, setFirstSnowflakeId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const {loading} = useCommunity();
  const {authData} = useAuth();

  const community = useGetLatestPosts({
    sub: authData?.sub || '',
    beforeId: undefined,
  });

  const keyExtractor = (item: FeedResponse) =>
    `${item.snowflakeId}-${item.customerName}`;

  const renderItem = useCallback(
    ({item, index}: {item: FeedResponse; index: any | null | undefined}) => {
      return (
        <PostItem
          key={`feed-post-${item.snowflakeId}-${item.sub}-${index}`}
          post={item}
        />
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
        renderItem={renderItem}
        data={community.data?.pages.flatMap(page => page) || []}
        estimatedItemSize={286}
        ListHeaderComponent={<CreatePostBar actionTitle={'Share a post'} />}
        keyExtractor={keyExtractor}
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.1}
        maintainVisibleContentPosition={{
          autoscrollToTopThreshold: 10,
          minIndexForVisible: 1,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Feed;
