import React from 'react';
import {Text, View} from 'react-native';
import {FeedResponse} from '../../types/generated.ts';
import {scale} from '../../utils/utils.ts';
import {COLORS} from '../../constants/commons.ts';
import {formatDistanceToNow} from 'date-fns/formatDistanceToNow';
import {Image} from 'expo-image';
import PostActionsBar from './PostActionsBar.tsx';
import PostAttachment from './PostAttachment.tsx';

interface PostItemProps {
  post: FeedResponse;
}

/**
 * Component to display a single post.
 *
 * @param {PostItemProps} props - The props for the component.
 * @param {FeedResponse} props.post - The post data to display.
 * @returns {JSX.Element} - The rendered post component.
 */

const PostItem = ({post}: PostItemProps): JSX.Element => {
  return (
    // PostItem Container
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
          transition={167}
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
        {/*Content PostItem*/}
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
        {/* Content Images */}
        {post.attachments &&
          post.attachments.length > 0 &&
          post.attachments.map((e, index) => (
            <PostAttachment
              key={`post-item-attachment-${e.attachmentType}-${e.referencedPostId}`}
              item={e}
              index={index}
              totalAttachments={post.attachments.length}
            />
          ))}
        {/* reference post tab */}
        {post.referencedPost && (
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: scale(6),
              paddingVertical: scale(8),
              borderWidth: 1,
              borderColor: '#CECECE',
              backgroundColor: '#f4f4f4',
              borderRadius: 12,
              flex: 1,
              gap: scale(6),
            }}>
            <View>
              {/*  Customer Photo  */}
              <Image
                source={{uri: post.referencedPost.customerPhoto}}
                style={{height: scale(20), width: scale(20), borderRadius: 50}}
                cachePolicy={'memory-disk'}
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
                  {post.referencedPost.customerName}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Light',
                    fontSize: scale(9),
                    color: COLORS.black2,
                  }}>
                  {formatDistanceToNow(
                    new Date(post.referencedPost.createdAt),
                    {
                      addSuffix: true,
                    },
                  )}
                </Text>
              </View>
              {/*Content PostItem*/}
              <View>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Medium',
                    fontSize: scale(13),
                    color: COLORS.black,
                  }}>
                  {post.referencedPost.content}
                </Text>
              </View>
            </View>
            {/*  Test  */}
          </View>
        )}
        {/* PostItem Actions */}
        <PostActionsBar likes={0} comments={0} repost={0} />
      </View>
    </View>
  );
};

export default PostItem;
