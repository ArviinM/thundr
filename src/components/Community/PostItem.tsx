import React, {useCallback, useRef, useState} from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FeedResponse} from '../../types/generated.ts';
import {scale} from '../../utils/utils.ts';
import {COLORS, SIZES, width} from '../../constants/commons.ts';
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
import {StackNavigationProp} from '@react-navigation/stack';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import ReportBottomSheetModal from '../Report/ReportBottomSheet.tsx';
import ReusableBottomSheetModal from '../shared/ReusableBottomSheetModal.tsx';
import Button from '../shared/Button.tsx';
import Clipboard from '@react-native-clipboard/clipboard';
import {API_PAYMENT_URL} from '@env';
import Toast from 'react-native-toast-message';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Repost} from '../../assets/images/community/Repost.tsx';
import {useAuth} from '../../providers/Auth.tsx';
import GradientText from '../shared/GradientText.tsx';
import GenericModal from '../shared/GenericModal.tsx';
import {useGetEditHistory} from '../../hooks/community/useEditHistory.ts';
import {Loading} from '../shared/Loading.tsx';

interface PostItemProps {
  post: FeedResponse;
  isFromPost?: boolean;
  isAddComment?: boolean;
  isRepostedPost?: boolean;
  postSub?: string;
  originalPoster?: string;
  isMatchesTab?: boolean;
}

const PostItem = ({
  post,
  isFromPost = false,
  isAddComment = false,
  isRepostedPost = false,
  postSub,
  originalPoster,
  isMatchesTab = false,
}: PostItemProps) => {
  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);
  const [initialImageIndex, setInitialImageIndex] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [visible, isVisible] = useState<boolean>(false);
  const insets = useSafeAreaInsets();

  const {authData} = useAuth();
  const editHistory = useGetEditHistory({
    sub: authData?.sub || '',
    postId: post.snowflakeId,
  });

  const openMediaViewer = (index: number) => {
    setInitialImageIndex(index);
    setIsImageViewerVisible(true);
  };

  const navigation = useNavigation<StackNavigationProp<RootNavigationParams>>();
  const {isUserVerified, showModal, handleDeletePost, handleRepost} =
    useCommunity();

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
    console.log('handling comment', {isMatchesTab});
    navigation.navigate('CreatePost', {
      isComment: true,
      referenceId: post.snowflakeId,
      screenTitle: 'Add Reply',
      postDetails: post,
      privacySettings: isMatchesTab ? 'MATCHES' : 'PUBLIC',
    });
  };

  const handleEditPost = () => {
    console.log('handling edit post');
    moreOptionsBSheet.current?.dismiss();
    navigation.navigate('CreatePost', {
      isEditPost: true,
      referenceId: post.snowflakeId,
      screenTitle: 'Edit Post',
      postDetails: post,
    });
  };

  return (
    <>
      <GenericModal
        isVisible={visible}
        content={
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: scale(350),
            }}>
            {editHistory.isLoading && <Loading />}
            {editHistory.data && editHistory.data.length > 0 && (
              <>
                <Text
                  style={{
                    fontSize: scale(14),
                    textAlign: 'center',
                    color: COLORS.primary1,
                    fontFamily: 'Montserrat-Bold',
                  }}>
                  Edit History
                </Text>

                {/*Versions*/}
                <ScrollView
                  style={{
                    paddingVertical: scale(10),
                  }}>
                  {/*Current Version*/}
                  <View
                    style={{
                      backgroundColor: '#F3F4F6',
                      width: width - 120,
                      paddingVertical: scale(12),
                      paddingHorizontal: scale(10),
                      gap: scale(6),
                      borderRadius: 10,
                      marginVertical: scale(8),
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-SemiBold',
                        fontSize: scale(13),
                        color: COLORS.black,
                      }}>
                      Current Version
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Regular',
                        fontSize: scale(13),
                        color: COLORS.black,
                      }}>
                      {post.content}
                    </Text>
                  </View>
                  {/*Revision Version*/}
                  {editHistory.data.length > 0 &&
                    editHistory.data.map(item => (
                      <View
                        key={`${item.id}-edit-history`}
                        style={{
                          backgroundColor: '#F3F4F6',
                          width: width - 120,
                          paddingVertical: scale(12),
                          paddingHorizontal: scale(10),
                          gap: scale(6),
                          borderRadius: 10,
                          marginVertical: scale(8),
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Montserrat-SemiBold',
                            fontSize: scale(13),
                            color: COLORS.black,
                          }}>
                          Revision at{' '}
                          {new Date(item.createdAt).toLocaleString()}
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Montserrat-Regular',
                            fontSize: scale(13),
                            color: COLORS.black,
                          }}>
                          {item.originalContent}
                        </Text>
                      </View>
                    ))}
                </ScrollView>

                <Button
                  onPress={() => {
                    isVisible(false);
                  }}
                  text="Close"
                  buttonStyle={styles.buttonStyle2}
                  textStyle={styles.buttonTextStyle2}
                />
              </>
            )}
          </View>
        }
      />
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={isFromPost}
        onPress={() => {
          if (isUserVerified) {
            navigation.push('Post', {
              snowflakeId: post.snowflakeId,
            });
          }

          if (!isUserVerified) {
            showModal();
          }
        }}>
        {isRepostedPost && (
          <View
            style={{
              paddingHorizontal: scale(60),
              marginBottom: -scale(7),
              flexDirection: 'row',
              alignItems: 'center',
              gap: scale(6),
            }}>
            <Repost focused={false} />
            <Text
              style={{
                fontSize: scale(9),
                fontFamily: 'Montserrat-Medium',
                color: COLORS.black,
              }}>
              {authData?.sub === postSub ? 'You' : originalPoster} reposted
            </Text>
          </View>
        )}
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
              placeholder={post.customerPhotoBlurHash}
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
          <View style={{flex: 1, gap: scale(3)}}>
            {/* Name and Time Bar */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: scale(6),
              }}>
              {post.accountType === 'CORPORATE' && (
                <GradientText text={post.customerName} />
              )}
              {post.accountType !== 'CORPORATE' && (
                <Text
                  style={{
                    fontFamily: 'Montserrat-Bold',
                    fontSize: scale(13),
                    color:
                      typeof post.matchTag === 'undefined'
                        ? COLORS.black
                        : post.matchTag === 'MARE'
                        ? COLORS.secondary2
                        : COLORS.primary1,
                  }}>
                  {post.customerName}
                </Text>
              )}
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
            {/*Content Edit Post Viewer*/}
            {post.edited === 1 && (
              <TouchableOpacity
                style={{justifyContent: 'center', alignItems: 'flex-start'}}
                onPress={() => isVisible(true)}>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Regular',
                    fontSize: scale(10),
                    color: COLORS.primary1,
                  }}>
                  Edited{' '}
                  {formatDistanceToNow(new Date(post.updatedAt), {
                    addSuffix: true,
                  })}
                </Text>
              </TouchableOpacity>
            )}
            {/*Content PostItem*/}
            <View>
              {post.content && <HighlightedText text={post.content} />}
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
                    marginVertical: scale(3),
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

                      if (attachment.attachmentType === 'WEB_EMBED') {
                        if (attachment.attachmentUrl) {
                          Linking.openURL(attachment.attachmentUrl).catch(err =>
                            console.error('An error occurred', err),
                          );
                        }
                      }

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
          createdAt: post.updatedAt,
        }}
      />

      <ReusableBottomSheetModal
        ref={repostOptionsBSheet}
        snapPoints={['25%', '50%']}>
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
            onPress={async () => {
              setLoading(true);
              await handleRepost(
                post.snowflakeId,
                1,
                !post.isReposted ?? true,
                isMatchesTab,
              );
              repostOptionsBSheet.current?.dismiss();
              Toast.show({
                type: 'THNRSuccess',
                props: {
                  subtitle: `Successfully ${
                    post.isReposted ? 'Undo Repost' : 'Repost'
                  }!`,
                },
                position: 'top',
                topOffset: insets.top,
              });
              setLoading(false);
            }}
            text={post.isReposted ? 'Undo Repost' : 'Repost'}
            buttonStyle={styles.buttonStyle}
            textStyle={styles.textStyle}
            loading={loading}
          />
          <Button
            onPress={() => repostOptionsBSheet.current?.dismiss()}
            text={'Close'}
            buttonStyle={styles.buttonStyle}
            textStyle={styles.textStyle}
          />
        </View>
      </ReusableBottomSheetModal>

      <ReusableBottomSheetModal
        ref={moreOptionsBSheet}
        snapPoints={
          post.sub !== authData?.sub ? ['25%', '50%'] : ['36%', '50%']
        }>
        <View style={{gap: scale(10)}}>
          {post.sub === authData?.sub && (
            <Button
              onPress={handleEditPost}
              text={'Edit Post'}
              buttonStyle={styles.buttonStyle}
              textStyle={styles.textStyle}
            />
          )}
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
          {post.sub === authData?.sub && (
            <Button
              onPress={async () => {
                setDeleteLoading(true);
                await handleDeletePost(post.snowflakeId);
                setDeleteLoading(false);
              }}
              text={'Delete Post'}
              buttonStyle={styles.buttonStyle}
              textStyle={styles.textStyle}
              loading={deleteLoading}
            />
          )}
          <Button
            onPress={() => moreOptionsBSheet.current?.dismiss()}
            text={'Close'}
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
  buttonStyle2: {
    alignItems: 'center',
    // maxWidth: width,
    width: width - 120,
    height: 50,
    justifyContent: 'center',
    borderRadius: 30,
    marginTop: 12,
    color: COLORS.white2,
    borderWidth: 1,
    borderColor: COLORS.gray4,
  },
  buttonTextStyle2: {
    fontFamily: 'Montserrat-Bold',
    color: COLORS.gray4,
    fontSize: SIZES.h5,
  },
});
