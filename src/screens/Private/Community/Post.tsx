import React, {useCallback, useState, useEffect} from 'react';
import {ScrollView, Text, View, RefreshControl} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../../../constants/commons.ts';
import {RouteProp} from '@react-navigation/native';
import {FeedResponse, IMessage} from '../../../types/generated.ts';
import ErrorView from '../../../components/shared/ErrorView.tsx';
import PostItem from '../../../components/Community/PostItem.tsx';
import {scale} from '../../../utils/utils.ts';
import CreatePostBar from '../../../components/Community/CreatePostBar.tsx';
import {RootNavigationParams} from '../../../constants/navigator.ts';
import {FlashList} from '@shopify/flash-list';
import {useAuth} from '../../../providers/Auth.tsx';
import {useGetReplies} from '../../../hooks/community/useGetReplies.ts';
import {Loading} from '../../../components/shared/Loading.tsx';

export type PostParams = {
  snowflakeId?: string;
  postDetails?: FeedResponse;
};

type PostProps = {
  route?: RouteProp<RootNavigationParams, 'Post'>;
};

const Post: React.FC<PostProps> = ({route}) => {
  const {authData} = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [firstReplyId, setFirstReplyId] = useState<string | null>(null);

  const getReplies = useGetReplies({
    sub: authData?.sub || '',
    snowflakeId: route?.params?.snowflakeId || '',
  });

  const renderItem = useCallback(
    (feed: {item: FeedResponse; index: any | null | undefined}) => (
      <View>
        <PostItem post={feed.item} />
      </View>
    ),
    [],
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await getReplies.refetch();
    } catch (error) {
      console.error('Error refreshing replies:', error);
    } finally {
      setRefreshing(false);
    }
  }, [getReplies]);

  const loadMoreReplies = async () => {
    if (
      getReplies.isLoading ||
      getReplies.isFetchingNextPage ||
      !getReplies.hasNextPage
    ) {
      return;
    }

    const currentFirstReplyId = getReplies.data?.pages[0][0]?.snowflakeId;

    if (currentFirstReplyId !== firstReplyId) {
      setFirstReplyId(currentFirstReplyId as string);
      return;
    }

    await getReplies.fetchNextPage();
  };

  useEffect(() => {
    if (getReplies.data?.pages[0][0]?.snowflakeId) {
      setFirstReplyId(getReplies.data.pages[0][0].snowflakeId as string);
    }
  }, [getReplies.data]);

  if (!route?.params?.snowflakeId || !route?.params?.postDetails) {
    return <ErrorView message="Unable to load post. Missing required data." />;
  }

  const {postDetails, snowflakeId} = route.params;

  if (getReplies.isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: COLORS.white}}
      edges={['left', 'right']}>
      <FlashList
        ListHeaderComponent={() => (
          <>
            <View style={{flex: 1}}>
              <PostItem post={postDetails} isFromPost />
            </View>
            <View
              style={{
                paddingHorizontal: scale(16),
                paddingVertical: scale(10),
                borderTopWidth: 0.2,
                borderTopColor: COLORS.black4,
              }}>
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: scale(10),
                  color: COLORS.black4,
                }}>
                Replies
              </Text>
            </View>
          </>
        )}
        estimatedItemSize={100}
        data={getReplies.data?.pages.flatMap(page => page) || []}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={loadMoreReplies}
        onEndReachedThreshold={0.1}
        maintainVisibleContentPosition={{
          autoscrollToTopThreshold: 10,
          minIndexForVisible: 1,
        }}
      />
      <View style={{paddingBottom: scale(36)}}>
        <CreatePostBar
          actionTitle={'Write a reply...'}
          isComment
          referenceId={snowflakeId}
          postDetails={postDetails}
        />
      </View>
    </SafeAreaView>
  );
};

export default Post;
