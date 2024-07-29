import React from 'react';
import {Text, View} from 'react-native';
import {FeedResponse} from '../../types/generated.ts';
import {scale} from '../../utils/utils.ts';
import {COLORS} from '../../constants/commons.ts';
import {formatDistanceToNow} from 'date-fns/formatDistanceToNow';
import {Image} from 'expo-image';
import PostActionsBar from './PostActionsBar.tsx';

interface PostProps {
  post: FeedResponse;
}

/**
 * Component to display a single post.
 *
 * @param {PostProps} props - The props for the component.
 * @param {FeedResponse} props.post - The post data to display.
 * @returns {JSX.Element} - The rendered post component.
 */

const Post = ({post}: PostProps): JSX.Element => {
  return (
    // Post Container
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: scale(16),
        paddingVertical: scale(10),
        flex: 1,
        gap: scale(6),
      }}>
      {/* Profile Image */}
      <View>
        <Image
          source={post.customerPhoto}
          style={{
            width: scale(40),
            height: scale(40),
            borderRadius: 30,
          }}
          transition={100}
        />
      </View>
      <View style={{flex: 1, gap: scale(6)}}>
        {/* Name and Time Bar */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: scale(6),
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
              fontSize: scale(13),
              color: COLORS.black,
            }}>
            {post.customerName}
          </Text>
          <Text
            style={{
              fontFamily: 'Montserrat-Light',
              fontSize: scale(9),
              color: COLORS.black2,
            }}>
            {formatDistanceToNow(new Date(post.createdAt), {
              addSuffix: true,
            })}
          </Text>
        </View>
        {/* Content Post */}
        <View>
          <Text
            style={{
              fontFamily: 'Montserrat-Medium',
              fontSize: scale(13),
              color: COLORS.black,
            }}>
            {post.content}
          </Text>
        </View>
        {/* Post Actions */}
        <PostActionsBar likes={0} comments={0} repost={0} />
      </View>
    </View>
  );
};

export default Post;
