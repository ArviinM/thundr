import React, {useCallback, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
import {useNavigation} from '@react-navigation/native';
import {RootNavigationParams} from '../../constants/navigator.ts';
import PostReferencePost from './PostReferencePost.tsx';
import {useCommunity} from '../../providers/Community.tsx';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import ReportBottomSheetModal from '../Report/ReportBottomSheet.tsx';
import ReusableBottomSheetModal from '../shared/ReusableBottomSheetModal.tsx';
import Button from '../shared/Button.tsx';
import Clipboard from '@react-native-clipboard/clipboard';
import {API_PAYMENT_URL} from '@env';
import Toast from 'react-native-toast-message';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface PostItemProps {
  post: FeedResponse;
  isFromPost?: boolean;
  isAddComment?: boolean;
}

const PostItem = ({
  post,
  isFromPost = false,
  isAddComment = false,
}: PostItemProps) => {
  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);
  const [initialImageIndex, setInitialImageIndex] = useState(0);

  const insets = useSafeAreaInsets();

  const openMediaViewer = (index: number) => {
    setInitialImageIndex(index);
    setIsImageViewerVisible(true);
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<RootNavigationParams>>();
  const {isUserVerified, showModal} = useCommunity();

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handleOpenReportBSheet = () => {
    moreOptionsBSheet.current?.dismiss();
    bottomSheetRef.current?.present();
  };

  const moreOptionsBSheet = useRef<BottomSheetModal>(null);
  const handlOpenMoreOptions = useCallback(() => {
    if (!isUserVerified) {
      showModal();
    }

    if (isUserVerified) {
      moreOptionsBSheet.current?.present();
    }
  }, [isUserVerified, showModal]);

  const repostOptionsBSheet = useRef<BottomSheetModal>(null);
  const handleOpenRepostOptions = useCallback(() => {
    if (!isUserVerified) {
      showModal();
    }

    if (isUserVerified) {
      repostOptionsBSheet.current?.present();
    }
  }, [isUserVerified, showModal]);

  const copyToClipboard = () => {
    const textToCopy = `${API_PAYMENT_URL}/app/post/${BigInt(
      post.snowflakeId,
    ).toString(36)}`;
    Clipboard.setString(textToCopy);
    moreOptionsBSheet.current?.dismiss();

    Toast.show({
      type: 'THNRSuccess',
      props: {
        title: 'Link Copied',
        subtitle: 'Share this with your kumares!',
      },
      position: 'top',
      topOffset: insets.top,
    });
  };

  const handleComment = () => {
    navigation.navigate('CreatePost', {
      isComment: true,
      referenceId: post.snowflakeId,
      screenTitle: 'Add Reply',
      postDetails: post,
    });
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={isFromPost}
        onPress={() => {
          if (isUserVerified) {
            navigation.push('Post', {
              snowflakeId: post.snowflakeId,
              postDetails: post,
            });
          }

          if (!isUserVerified) {
            showModal();
          }
        }}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: scale(16),
            paddingVertical: scale(10),
            flex: 1,
            gap: scale(6),
          }}>
          <View style={{alignItems: 'center'}}>
            {/* Profile Image */}
            <Image
              source={post.customerPhoto}
              style={{
                width: scale(40),
                height: scale(40),
                borderRadius: 30,
              }}
              transition={167}
            />
            {isAddComment && (
              <View
                style={{
                  width: 1,
                  height: '100%',
                  backgroundColor: COLORS.black4,
                }}
              />
            )}
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
                    gap: scale(isAddComment ? 1 : 2),
                    borderRadius: isAddComment ? 0 : 12,
                    overflow: 'hidden',
                  },
                ]}>
                {post.attachments.map((attachment, index) => (
                  <TouchableOpacity
                    key={`post-item-attachment-${attachment.attachmentType}-${attachment.id}`}
                    disabled={isAddComment}
                    activeOpacity={0.8}
                    onPress={() => {
                      attachment.attachmentType !== 'WEB_EMBED' &&
                        isUserVerified &&
                        openMediaViewer(index);

                      if (!isUserVerified) {
                        showModal();
                      }
                    }}
                    style={[
                      !isAddComment && {
                        width: `${calculateWidth(
                          post.attachments.length,
                          index,
                        )}%`,
                        borderColor: COLORS.black4,
                      },

                      attachment.attachmentType !== 'WEB_EMBED' &&
                        isAddComment && {
                          width: scale(70),
                          height: scale(70),
                          aspectRatio: 1,
                        },

                      attachment.attachmentType !== 'WEB_EMBED' &&
                        !isAddComment && {
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
                      isAddComment={isAddComment}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
            {/* Post Reference Post or "QUOTE REPOST"  */}
            {post.referencedPost && (
              <PostReferencePost referencePost={post.referencedPost} />
            )}
            {/* PostItem Actions */}
            {!isAddComment && (
              <PostActionsBar
                likes={post.likeCount}
                comments={post.commentCount}
                repost={post.repostCount}
                isReposted={post.isReposted}
                isLiked={post.isLiked}
                postId={post.snowflakeId}
                handleMoreOptions={handlOpenMoreOptions}
                handleRepostOptions={handleOpenRepostOptions}
                handleComment={handleComment}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
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

      <ReusableBottomSheetModal ref={repostOptionsBSheet} snapPoints={['25%']}>
        <View style={{gap: scale(10)}}>
          <Button
            onPress={() => {
              repostOptionsBSheet.current?.dismiss();
              navigation.navigate('CreatePost', {
                isComment: false,
                isQuoteRepost: true,
                referenceId: post.snowflakeId,
                screenTitle: 'Quote Post',
                postDetails: post,
              });
            }}
            text={'Quote Repost'}
            buttonStyle={styles.buttonStyle}
            textStyle={styles.textStyle}
          />
          <Button
            onPress={() => console.log('Repost')}
            text={'Repost'}
            buttonStyle={styles.buttonStyle}
            textStyle={styles.textStyle}
          />
          <Button
            onPress={() => repostOptionsBSheet.current?.dismiss()}
            text={'Cancel'}
            buttonStyle={styles.buttonStyle}
            textStyle={styles.textStyle}
          />
        </View>
      </ReusableBottomSheetModal>

      <ReusableBottomSheetModal ref={moreOptionsBSheet} snapPoints={['25%']}>
        <View style={{gap: scale(10)}}>
          <Button
            onPress={copyToClipboard}
            text={'Share Post'}
            buttonStyle={styles.buttonStyle}
            textStyle={styles.textStyle}
          />
          <Button
            onPress={handleOpenReportBSheet}
            text={'Report Post'}
            buttonStyle={styles.buttonStyle}
            textStyle={styles.textStyle}
          />
          <Button
            onPress={() => console.log('Delete Post')}
            text={'Delete Post'}
            buttonStyle={styles.buttonStyle}
            textStyle={styles.textStyle}
          />
          <Button
            onPress={() => moreOptionsBSheet.current?.dismiss()}
            text={'Cancel'}
            buttonStyle={styles.buttonStyle}
            textStyle={styles.textStyle}
          />
        </View>
      </ReusableBottomSheetModal>

      <ReportBottomSheetModal
        ref={bottomSheetRef}
        sub={post.sub}
        category={'FEED'}
        name={post.customerName}
      />
    </>
  );
};

export default PostItem;

const styles = StyleSheet.create({
  buttonStyle: {
    borderWidth: 1,
    borderRadius: scale(16),
    borderColor: COLORS.gray5,
    paddingHorizontal: scale(20),
    paddingVertical: scale(8),
    backgroundColor: '#f5f5f5',
  },
  textStyle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: scale(13),
    color: COLORS.black,
  },
});
