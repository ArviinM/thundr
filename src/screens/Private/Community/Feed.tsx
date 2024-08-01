import React, {useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../../../constants/commons.ts';
import CreatePostBar from '../../../components/Community/CreatePostBar.tsx';
import {useCommunity} from '../../../providers/Community.tsx';
import {Loading} from '../../../components/shared/Loading.tsx';
import {FlashList} from '@shopify/flash-list';
import {useGetAllPost} from '../../../hooks/community/useGetAllPost.ts';
import {FeedResponse} from '../../../types/generated.ts';
import PostItem from '../../../components/Community/PostItem.tsx';

/**
 * Feed component displays a list of posts from the community.
 * It fetches the posts using the useGetAllPost hook and renders each post using the PostItem component.
 * If the posts are still loading, it displays a loading spinner.
 */
const Feed = () => {
  // Get the loading state from the useCommunity hook
  const {loading} = useCommunity();

  // Fetch the posts using the useGetAllPost hook
  const community = useGetAllPost();

  // Render each post using the PostItem component
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

  // If the posts are still loading, display a loading spinner
  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: COLORS.white}}
      edges={['right', 'left']}>
      {/* Will create here a loading animation soon */}

      {/* Feed List */}
      <FlashList
        renderItem={renderItem}
        data={community.data}
        estimatedItemSize={286}
        ListHeaderComponent={<CreatePostBar />}
      />
    </SafeAreaView>
  );
};
export default Feed;
