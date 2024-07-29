import React, {useEffect, useRef, useState} from 'react';
import {COLORS} from '../../../constants/commons.ts';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useCommunity} from '../../../providers/Community.tsx';
import {Image} from 'expo-image';
import {scale} from '../../../utils/utils.ts';
import GradientButton from '../../../components/shared/GradientButton.tsx';
import {ImagesIcon} from '../../../assets/images/chat/ImagesIcon.tsx';
import {KeyboardStickyView} from 'react-native-keyboard-controller';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {useCreatePost} from '../../../hooks/community/useCreatePost.ts';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootNavigationParams} from '../../../constants/navigator.ts';
import Toast from 'react-native-toast-message';
import {useQueryClient} from '@tanstack/react-query';
import {queryClient} from '../../../utils/queryClient.ts';

const postSchema = yup.object({
  postContent: yup.string().required('Please share something'),
});

const CreatePost = () => {
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();
  const {profileData} = useCommunity();
  const insets = useSafeAreaInsets();
  const query = useQueryClient(queryClient);

  const {mutateAsync} = useCreatePost();

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
    // Handle form submission here (e.g., send post to server)
    console.log(data);
    if (profileData) {
      await mutateAsync({
        sub: profileData.sub,
        content: data.postContent,
        inCommunity: 1,
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

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: '#f4f4f4'}}
      edges={['right', 'left']}>
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
                    textAlignVertical: 'bottom',
                    color: COLORS.black2,
                  }}
                  keyboardAppearance={'light'}
                  textAlignVertical="center"
                  maxLength={510}
                  selectionColor={COLORS.primary1}
                  multiline={true}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="postContent"
            />
            {errors.postContent && (
              <Text style={{color: 'red'}}>{errors.postContent.message}</Text>
            )}
          </View>
        </View>
      </View>
      {/* Sticky Actions Footer Bar */}
      <KeyboardStickyView>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: scale(12),
            paddingVertical: scale(10),
            backgroundColor: '#f4f4f4',
            alignItems: 'center',
            justifyContent: 'space-between',
            // paddingBottom: insets.bottom,
          }}>
          <View>
            <TouchableOpacity>
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
    </SafeAreaView>
  );
};

export default CreatePost;
