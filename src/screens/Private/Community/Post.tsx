import React, {useCallback, useState, useMemo} from 'react';
import {View, Text, RefreshControl} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RouteProp} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import {COLORS} from '../../../constants/commons';
import {FeedResponse} from '../../../types/generated';
import {RootNavigationParams} from '../../../constants/navigator';
import {useAuth} from '../../../providers/Auth';
import {useGetReplies} from '../../../hooks/community/useGetReplies';
import ErrorView from '../../../components/shared/ErrorView';
import PostItem from '../../../components/Community/PostItem';
import CreatePostBar from '../../../components/Community/CreatePostBar';
import {scale} from '../../../utils/utils';
import {Loading} from '../../../components/shared/Loading.tsx';
import {useGetPost} from '../../../hooks/community/useGetPost.ts';

export type PostProps = {
  route?: RouteProp<RootNavigationParams, 'Post'>;
};

const Post: React.FC<PostProps> = ({route}) => {
  const {authData} = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const {snowflakeId, postDetails} = route?.params || {};

  const getMainPost = useGetPost({
    sub: authData?.sub || '',
    postId: postDetails.snowflakeId,
  });

  const getReplies = useGetReplies({
    sub: authData?.sub || '',
    snowflakeId: snowflakeId || '',
  });

  const renderItem = useCallback(
    ({item}: {item: FeedResponse}) => <PostItem post={item} />,
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

  const loadMoreReplies = useCallback(() => {
    if (getReplies.hasNextPage && !getReplies.isFetchingNextPage) {
      getReplies.fetchNextPage();
    }
  }, [getReplies]);

  const ListHeaderComponent = useMemo(() => {
    if (!postDetails || !getMainPost.data) {
      return null;
    }
    return (
      <>
        <PostItem post={getMainPost.data} isFromPost />
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
    );
  }, [getMainPost.data, postDetails]);

  if (!snowflakeId || !postDetails) {
    return <ErrorView message="Unable to load post. Missing required data." />;
  }

  if (getReplies.isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: COLORS.white}}
      edges={['left', 'right']}>
      <FlashList
        ListHeaderComponent={ListHeaderComponent}
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

export default React.memo(Post);
