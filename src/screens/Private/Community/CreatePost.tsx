import React, {useCallback, useEffect, useRef, useState} from 'react';
import {COLORS} from '../../../constants/commons.ts';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useCommunity} from '../../../providers/Community.tsx';
import {Image} from 'expo-image';
import {
  MAX_IMAGE_COUNT,
  MAX_IMAGE_SIZE_BYTES,
  MAX_VIDEO_COUNT,
  MAX_VIDEO_SIZE_BYTES,
  scale,
} from '../../../utils/utils.ts';
import GradientButton from '../../../components/shared/GradientButton.tsx';
import {ImagesIcon} from '../../../assets/images/chat/ImagesIcon.tsx';
import {KeyboardStickyView} from 'react-native-keyboard-controller';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import {RootNavigationParams} from '../../../constants/navigator.ts';
import Toast from 'react-native-toast-message';
import {useQueryClient} from '@tanstack/react-query';
import {queryClient} from '../../../utils/queryClient.ts';
import ImagePicker from 'react-native-image-crop-picker';
import {FlashList} from '@shopify/flash-list';
import {ScrollView} from 'react-native-gesture-handler';
import {CloseIconWhite} from '../../../assets/images/CloseIconWhite.tsx';
import * as VideoThumbnails from 'expo-video-thumbnails';
import {FileAttachment} from '../../../types/generated.ts';
import PostItem from '../../../components/Community/PostItem.tsx';
import {Dropdown} from 'react-native-element-dropdown';
import {useGetUserCommunities} from '../../../hooks/community/useGetUserCommunities.ts';

const postSchema = yup.object({
  postContent: yup.string().required('Please share something'),
});

type CreatePostParams = {
  route?: RouteProp<RootNavigationParams, 'CreatePost'>;
};

const CreatePost = ({route}: CreatePostParams) => {
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();
  const insets = useSafeAreaInsets();
  const query = useQueryClient(queryClient);
  const inputRef = useRef<TextInput>(null);

  const {profileData, createPost, replyPost, editPost} = useCommunity();
  const [postLoading, setPostLoading] = useState<boolean>(false);
  const [videoThumbnails, setVideoThumbnails] = useState<
    Record<string, string>
  >({});

  const [selectedMedia, setSelectedMedia] = useState<any[]>([]);

  const postDetails = route?.params.postDetails;
  const isComment = route?.params.isComment;
  const isOpenGallery = route?.params.isOpenGallery;
  const isQuoteRepost = route?.params.isQuoteRepost;
  const privacySettings = route?.params.privacySettings;
  const isEditPost = route?.params.isEditPost;
  const communityTitle = route?.params.communityTitle;

  const [communityPost, setCommunityPost] = useState<{
    label: string;
    value: string;
  }>({
    label: privacySettings === 'PUBLIC' ? 'Feed' : 'Matches',
    value:
      communityTitle?.toString() === '1.3'
        ? '1'
        : communityTitle?.toString() || '1',
  });

  const userCommunities = useGetUserCommunities({
    sub: profileData?.sub || '',
  });

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    defaultValues: {
      postContent: isEditPost ? (postDetails && postDetails.content) ?? '' : '',
    },
    resolver: yupResolver(postSchema),
  });

  const onSubmit = async (data: {postContent: string}) => {
    let formattedMediaData: FileAttachment[] = [];

    if (selectedMedia) {
      formattedMediaData = selectedMedia.map(item => ({
        fileName: '',
        filePath: item.path,
        fileType: item.mime,
      }));
    }

    if (profileData) {
      setPostLoading(true);

      if (isEditPost && postDetails) {
        await editPost.mutateAsync({
          sub: profileData.sub,
          newContent: data.postContent,
          postId: postDetails.snowflakeId,
        });

        await query.invalidateQueries({
          queryKey: ['get-replies'],
        });

        await query.invalidateQueries({
          queryKey: ['get-post'],
        });
      }

      if (!isComment && !isQuoteRepost && !isEditPost) {
        await createPost.mutateAsync({
          sub: profileData.sub,
          content: data.postContent,
          inCommunity:
            communityPost.value === '1.3' ? '1' : communityPost.value,
          privacySettings:
            communityPost.label === 'Feed'
              ? 'PUBLIC'
              : communityPost.label === 'Matches'
              ? 'MATCHES'
              : 'PUBLIC',
          media: formattedMediaData,
        });
      }

      if (!isComment && isQuoteRepost && !isEditPost) {
        await createPost.mutateAsync({
          sub: profileData.sub,
          content: data.postContent,
          inCommunity:
            communityPost.value === '1.3' ? '1' : communityPost.value,
          privacySettings:
            communityPost.label === 'Feed'
              ? 'PUBLIC'
              : communityPost.label === 'Matches'
              ? 'MATCHES'
              : 'PUBLIC',
          media: formattedMediaData,
          referencedPost: postDetails?.snowflakeId,
          repostType: 'QUOTE',
        });
      }

      if (isComment && postDetails && !isEditPost) {
        await replyPost.mutateAsync({
          sub: profileData.sub,
          content: data.postContent,
          media: formattedMediaData,
          inCommunity:
            communityPost.value === '1.3' ? '1' : communityPost.value,
          privacySettings:
            communityPost.label === 'Feed'
              ? 'PUBLIC'
              : communityPost.label === 'Matches'
              ? 'MATCHES'
              : 'PUBLIC',
          parentPostId: postDetails.snowflakeId,
          topLevelPostId: postDetails.topLevelPostId || postDetails.snowflakeId,
        });

        await query.invalidateQueries({
          queryKey: ['get-replies', postDetails.snowflakeId],
        });
      }

      await query.invalidateQueries({queryKey: ['get-latest-posts']});
      await query.invalidateQueries({queryKey: ['get-matches-post']});

      Toast.show({
        type: 'THNRSuccess',
        props: {
          subtitle: 'Successfully Posted!',
        },
        position: 'top',
        topOffset: insets.top,
      });
      navigation.goBack();
      setPostLoading(false);
    }
  };

  const openMediaPicker = async () => {
    try {
      const newMedia = await ImagePicker.openPicker({
        multiple: true,
        mediaType: 'any',
        compressImageQuality: 0.8,
        loadingLabelText: 'Adding Media',
        forceJpg: true,
        maxFiles: 4,
      });

      if (!newMedia || newMedia.length === 0) {
        return null;
      }

      const videos = newMedia.filter(item => item.mime.startsWith('video'));
      const images = newMedia.filter(item => item.mime.startsWith('image'));

      if (videos.length === MAX_VIDEO_COUNT && images.length > 0) {
        Toast.show({
          type: 'THNRWarning',
          props: {
            title: 'Hala sis!',
            subtitle: 'You can only send a single video.',
          },
          position: 'bottom',
          bottomOffset: 60,
        });
        throw new Error('Video selection limit exceeded');
      }

      if (videos.length > MAX_VIDEO_COUNT) {
        Toast.show({
          type: 'THNRWarning',
          props: {
            title: 'Hala, ang dami!',
            subtitle: 'Please select a single video.',
          },
          position: 'bottom',
          bottomOffset: 60,
        });
        throw new Error('Video selection limit exceeded');
      }

      if (images.length > MAX_IMAGE_COUNT) {
        Toast.show({
          type: 'THNRWarning',
          props: {
            title: 'Hala, ang dami!',
            subtitle: 'Please select up to 4 images.',
          },
          position: 'bottom',
          bottomOffset: 60,
        });
        throw new Error('Image selection limit exceeded');
      }

      for (const video of videos) {
        if (video.size >= MAX_VIDEO_SIZE_BYTES) {
          Toast.show({
            type: 'THNRWarning',
            props: {
              title: 'Hala, ang laki!',
              subtitle: 'Limit upload up to 25mb per video',
            },
            position: 'bottom',
            bottomOffset: 60,
          });
          throw new Error('Video exceeds maximum size limit');
        }
      }

      for (const image of images) {
        if (image.size >= MAX_IMAGE_SIZE_BYTES) {
          Toast.show({
            type: 'THNRWarning',
            props: {
              title: 'Hala, ang laki!',
              subtitle: 'Limit upload up to 8mb per photo',
            },
            position: 'bottom',
            bottomOffset: 60,
          });
          throw new Error('Image exceeds maximum size limit');
        }
      }

      // Filter out already selected media
      const filteredMedia = newMedia.filter(
        newItem =>
          !selectedMedia.some(
            selectedItem => selectedItem.path === newItem.path,
          ),
      );
      setSelectedMedia([...filteredMedia]);
    } catch (error) {
      console.error('Media picker error:', error);
    }
  };

  const renderMediaList = useCallback(
    ({item}: {item: any}) => {
      const calculatedWidth = (225 * item.width) / item.height;

      const handleRemoveImage = () => {
        setSelectedMedia(
          selectedMedia.filter(image => image.path !== item.path),
        );
      };

      return (
        <View style={{position: 'relative'}}>
          <Image
            source={{uri: videoThumbnails[item.path] || item.path}}
            style={{
              height: 225,
              width: calculatedWidth,
              borderRadius: 10,
            }}
            contentFit={'contain'}
          />
          <TouchableOpacity
            onPress={handleRemoveImage}
            style={{
              position: 'absolute',
              top: 5,
              right: 5,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderRadius: 15,
              padding: 8,
            }}>
            <CloseIconWhite />
            {/*<MinusIcon />*/}
          </TouchableOpacity>
        </View>
      );
    },
    [selectedMedia, videoThumbnails],
  );

  useEffect(() => {
    const generateThumbnails = async () => {
      const thumbnails: Record<string, string> = {};
      for (const item of selectedMedia) {
        if (item.mime && item.mime.startsWith('video/')) {
          try {
            const {uri} = await VideoThumbnails.getThumbnailAsync(
              item.path,
              {time: 1000}, // Get thumbnail at 1 second
            );
            thumbnails[item.path] = uri;
          } catch (error) {
            console.error('Error generating thumbnail:', error);
          }
        }
      }
      setVideoThumbnails(thumbnails);
    };

    generateThumbnails();
  }, [selectedMedia]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (isOpenGallery) {
      setTimeout(() => openMediaPicker(), 100);
    }
  }, [isOpenGallery]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#f4f4f4',
        paddingBottom: insets.bottom,
      }}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
        }}>
        {!isEditPost && postDetails && (
          <View>
            <PostItem post={postDetails} isFromPost isAddComment={isComment} />
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: scale(18),
            paddingVertical: isComment ? 0 : scale(8),
            gap: scale(8),
            flex: 1,
            backgroundColor: '#ffffff',
          }}>
          <View>
            {/*  Image Container  */}
            <Image
              key={`${profileData?.customerPhoto[0].photoUrl}`}
              source={profileData?.customerPhoto[0].photoUrl}
              placeholder={profileData?.customerPhoto[0].blurHash}
              style={{width: scale(40), height: scale(40), borderRadius: 30}}
              transition={100}
            />
          </View>
          <View style={{flex: 1}}>
            <View>
              <Text
                style={{
                  fontFamily: 'Montserrat-Medium',
                  fontSize: scale(12),
                  color: COLORS.black2,
                }}>
                {!isComment
                  ? profileData?.name
                  : `Replying to ${profileData?.name}`}
              </Text>
            </View>
            {!isComment && !isEditPost && userCommunities.data && (
              <View>
                <Dropdown
                  data={userCommunities.data}
                  labelField="label"
                  valueField="value"
                  onChange={item => setCommunityPost(item)}
                  placeholder="Choose where to post"
                  searchPlaceholder="Search..."
                  value={communityPost.value}
                  search
                  maxHeight={300}
                  style={styles.dropdown}
                  itemTextStyle={{
                    fontFamily: 'Montserrat-Medium',
                    color: '#070707',
                    fontSize: scale(13),
                  }}
                  selectedTextStyle={{
                    fontFamily: 'Montserrat-Medium',
                    color: '#070707',
                    fontSize: scale(13),
                  }}
                  inputSearchStyle={{
                    fontFamily: 'Montserrat-Regular',
                    color: 'rgba(7,7,7,0.7)',
                    borderRadius: scale(8),
                    fontSize: scale(13),
                  }}
                  itemContainerStyle={{borderRadius: scale(8)}}
                  containerStyle={{borderRadius: scale(12)}}
                />
              </View>
            )}
            <View>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    ref={inputRef}
                    placeholder={"What's the tea?"}
                    placeholderTextColor={COLORS.black4}
                    style={{
                      fontFamily: 'Montserrat-Medium',
                      fontSize: scale(16),
                      textAlignVertical: 'top',
                      color: COLORS.black2,
                      verticalAlign: 'top',
                    }}
                    keyboardAppearance={'light'}
                    textAlignVertical="top"
                    maxLength={500}
                    selectionColor={COLORS.primary1}
                    multiline={true}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    inputMode={'text'}
                    numberOfLines={2}
                  />
                )}
                name="postContent"
              />
              {errors.postContent && (
                <Text style={{color: 'red'}}>{errors.postContent.message}</Text>
              )}
            </View>
            {selectedMedia.length > 0 && (
              <View style={{width: '100%', height: 225, marginTop: scale(10)}}>
                <FlashList
                  data={selectedMedia}
                  renderItem={renderMediaList}
                  keyExtractor={(_, index) => index.toString()}
                  estimatedItemSize={100}
                  horizontal
                  ItemSeparatorComponent={() => (
                    <View style={{marginHorizontal: scale(6)}} />
                  )}
                  showsHorizontalScrollIndicator
                  alwaysBounceHorizontal
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <KeyboardStickyView>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: scale(12),
            paddingVertical: scale(10),
            backgroundColor: '#f4f4f4',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <TouchableOpacity onPress={openMediaPicker}>
              <ImagesIcon color={COLORS.black} />
            </TouchableOpacity>
          </View>
          <View>
            <GradientButton
              onPress={handleSubmit(onSubmit)}
              text={!isComment ? 'Post' : 'Reply'}
              buttonStyle={{
                paddingHorizontal: scale(20),
                paddingVertical: scale(5),
                borderRadius: 20,
              }}
              textStyle={{
                fontFamily: 'Montserrat-Medium',
                fontSize: scale(12),
                color: COLORS.white,
              }}
              disabled={!isValid || postLoading}
              loading={postLoading}
            />
          </View>
        </View>
      </KeyboardStickyView>
    </View>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  dropdown: {
    marginVertical: scale(4),
    height: scale(33),
    width: scale(260),
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderColor: 'rgba(0, 0, 0, 0.17)',
    borderWidth: 1,
    borderRadius: scale(12),
    padding: scale(11),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
