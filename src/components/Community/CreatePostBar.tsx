import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useCommunity} from '../../providers/Community.tsx';
import {Image} from 'expo-image';
import {scale} from '../../utils/utils.ts';
import Button from '../shared/Button.tsx';
import {ImagesIcon} from '../../assets/images/chat/ImagesIcon.tsx';
import {COLORS} from '../../constants/commons.ts';
import {RootNavigationParams} from '../../constants/navigator.ts';
import {FeedResponse} from '../../types/generated.ts';

interface CreatePostCommentBarProps {
  actionTitle: string;
  isComment?: boolean;
  referenceId?: string;
  postDetails?: FeedResponse;
}

const CreatePostCommentBar: React.FC<CreatePostCommentBarProps> = ({
  actionTitle,
  isComment = false,
  referenceId,
  postDetails,
}) => {
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();
  const {profileData, isUserVerified, showModal} = useCommunity();

  const handlePress = (isOpenGallery?: boolean) => {
    navigation.navigate('CreatePost', {
      isComment,
      referenceId,
      screenTitle: isComment ? 'Add Reply' : 'Create Post',
      postDetails: postDetails,
      isOpenGallery,
    });
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: scale(10),
        paddingVertical: scale(16),
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingBottom: scale(6),
      }}>
      <TouchableOpacity onPress={() => navigation.navigate('ProfileStack')}>
        {profileData && (
          <Image
            source={profileData?.customerPhoto[0].photoUrl}
            placeholder={profileData?.customerPhoto[0].blurHash}
            style={{width: scale(40), height: scale(40), borderRadius: 30}}
            transition={167}
          />
        )}
      </TouchableOpacity>
      <Button
        onPress={() => {
          if (isUserVerified) {
            handlePress(false);
          } else {
            showModal();
          }
        }}
        text={actionTitle}
        buttonStyle={{
          width: scale(260),
          height: scale(35),
          borderWidth: 1,
          backgroundColor: '#F5F5F5',
          marginHorizontal: scale(10),
          borderRadius: 18.5,
          alignItems: 'flex-start',
          justifyContent: 'center',
          borderColor: '#CDCDCD',
        }}
        textStyle={{
          fontSize: scale(13),
          marginLeft: scale(10),
          fontFamily: 'Montserrat-Medium',
          color: COLORS.black,
        }}
      />
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          if (isUserVerified) {
            handlePress(true);
          } else {
            showModal();
          }
        }}>
        <ImagesIcon color={COLORS.black} />
      </TouchableOpacity>
    </View>
  );
};

export default CreatePostCommentBar;
