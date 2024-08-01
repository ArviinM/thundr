import React, {useCallback, useEffect, useRef, useState} from 'react';
import {COLORS} from '../../../constants/commons.ts';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useCommunity} from '../../../providers/Community.tsx';
import {Image} from 'expo-image';
import {scale} from '../../../utils/utils.ts';
import GradientButton from '../../../components/shared/GradientButton.tsx';
import {ImagesIcon} from '../../../assets/images/chat/ImagesIcon.tsx';
import {KeyboardStickyView} from 'react-native-keyboard-controller';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {NavigationProp, useNavigation} from '@react-navigation/native';
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

const postSchema = yup.object({
  postContent: yup.string().required('Please share something'),
});

const CreatePost = () => {
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();
  const {profileData, createPost} = useCommunity();
  const insets = useSafeAreaInsets();
  const query = useQueryClient(queryClient);

  const inputRef = useRef<TextInput>(null); // Ref to access the TextInput
  useEffect(() => {
    // Automatically focus the TextInput when it's rendered
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    defaultValues: {postContent: ''},
    resolver: yupResolver(postSchema),
  });

  const onSubmit = async (data: {postContent: string}) => {
    let formattedMediaData: FileAttachment[] = [];

    if (profileData) {
      if (selectedMedia) {
        console.log({selectedMedia});
        formattedMediaData = selectedMedia.map(item => ({
          fileName: '',
          filePath: item.path,
          fileType: item.mime,
        }));
      }

      await createPost.mutateAsync({
        sub: profileData.sub,
        content: data.postContent,
        inCommunity: 1,
        media: formattedMediaData,
      });

      Toast.show({
        type: 'THNRSuccess',
        props: {
          subtitle: 'Successfully Posted!',
        },
        position: 'top',
        topOffset: insets.top,
      });
      await query.invalidateQueries({queryKey: ['get-all-post']});
      navigation.navigate('FeedStack');
    }
  };

  const [videoThumbnails, setVideoThumbnails] = useState<
    Record<string, string>
  >({});

  const [selectedMedia, setSelectedMedia] = useState<any[]>([]);

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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#f4f4f4',
        paddingBottom: insets.bottom,
        // paddingLeft: insets.left,
        // paddingRight: insets.right,
      }}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
          // paddingBottom: scale(400),
          // borderWidth: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: scale(14),
            paddingVertical: scale(8),
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
                {profileData?.name}
              </Text>
            </View>
            <View>{/*  Dropdown here WIP  */}</View>
            <View>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    ref={inputRef}
                    placeholder={'Share something here'}
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
                    maxLength={255}
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
              text={'Post'}
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
              disabled={!isValid}
            />
          </View>
        </View>
      </KeyboardStickyView>
    </View>
  );
};

export default CreatePost;
