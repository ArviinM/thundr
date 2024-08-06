import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {FeedResponse} from '../../types/generated.ts';
import {scale} from '../../utils/utils.ts';
import {COLORS} from '../../constants/commons.ts';
import {formatDistanceToNow} from 'date-fns/formatDistanceToNow';
import {Image} from 'expo-image';
import PostActionsBar from './PostActionsBar.tsx';
import PostAttachment from './PostAttachment.tsx';
import HighlightedText from './HighlightedText.tsx';
import EnhancedImageViewing from './PostItemGallery.tsx';
import {calculateAspectRatio, calculateWidth} from './communityUtils.ts';

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
  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);
  const [initialImageIndex, setInitialImageIndex] = useState(0);

  const openMediaViewer = (index: number) => {
    setInitialImageIndex(index);
    setIsImageViewerVisible(true);
  };

  return (
    <>
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
            <HighlightedText text={post.content} />
          </View>
          {/* Content Images */}
          {post.attachments && post.attachments.length > 0 && (
            <View
              style={[
                {
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: scale(2),
                  borderRadius: 12,
                  overflow: 'hidden',
                },
              ]}>
              {post.attachments.map((attachment, index) => (
                <TouchableOpacity
                  key={`post-item-attachment-${attachment.attachmentType}-${attachment.id}`}
                  onPress={() =>
                    attachment.attachmentType !== 'WEB_EMBED' &&
                    openMediaViewer(index)
                  }
                  style={[
                    {
                      width: calculateWidth(post.attachments.length, index),
                      borderColor: COLORS.black4,
                    },
                    attachment.attachmentType !== 'WEB_EMBED' && {
                      aspectRatio: calculateAspectRatio(
                        post.attachments.length,
                        index,
                        attachment.attachmentWidth,
                        attachment.attachmentHeight,
                      ),
                    },
                  ]}>
                  <PostAttachment
                    item={attachment}
                    index={index}
                    totalAttachments={post.attachments.length}
                  />
                </TouchableOpacity>
              ))}
            </View>
          )}
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
                  style={{
                    height: scale(20),
                    width: scale(20),
                    borderRadius: 50,
                  }}
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
            </View>
          )}
          {/* PostItem Actions */}
          <PostActionsBar likes={0} comments={0} repost={0} />
        </View>
      </View>
      <EnhancedImageViewing
        attachments={post.attachments}
        initialImageIndex={initialImageIndex}
        isVisible={isImageViewerVisible}
        setVisible={setIsImageViewerVisible}
        customerProfile={{
          customerName: post.customerName,
          customerPhoto: post.customerPhoto,
          customerPhotoBlurHash: post.customerPhotoBlurHash,
          createdAt: post.createdAt,
        }}
      />
    </>
  );
};

export default PostItem;
