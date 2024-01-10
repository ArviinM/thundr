// React modules
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';

// Third party libraries
import {TouchableOpacity} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';

// Components
import {BorderLinearGradient} from '../../screens/public/ProfileCreationScreen/Styled';
import Image from '../../components/Image/Image';

// Utils
import {GLOBAL_ASSET_URI} from '../../utils/images';
import {scale, verticalScale} from '../../utils/commons';
import {UPLOAD_PHOTO} from '../../ducks/ProfileCreation/actionTypes';
import {GET_CURRENT_USER_PROFILE} from '../../ducks/Dashboard/actionTypes';

const MultiplePhotoSelection = props => {
  const dispatch = useDispatch();
  const {loginData} = useSelector(state => state.login);
  const {sub} = useSelector(state => state.persistedState);
  const {currentUserProfile} = useSelector(state => state.dashboard);

  const openImageLibrary = async ({primaryPhoto}) => {
    try {
      const image = await ImagePicker.openPicker({
        mediaType: 'photo',
        multiple: false,
        includeBase64: true,
        width: 300,
        height: 400,
        cropping: true,
      });

      if (image) {
        const formData = new FormData();

        formData.append('sub', loginData.sub || sub);
        formData.append('isPrimary', primaryPhoto ? 'true' : 'false');
        formData.append('filepath', image?.data);
        formData.append('filename', image?.path);
        formData.append('oldPhotoId', '');

        dispatch({type: UPLOAD_PHOTO, payload: {formData}});
        dispatch({type: GET_CURRENT_USER_PROFILE});
      }

      if (!image) {
        return null;
      }
    } catch (error) {
      // Handle error, e.g., user canceled the picker
      console.error(error);
    }
  };

  const currentUserPrimaryPhoto = currentUserProfile?.customerPhoto.filter(
    item => item.primary,
  );
  return (
    <View style={{flexDirection: 'row', left: scale(-10), flex: 1}}>
      <TouchableOpacity onPress={() => openImageLibrary({primaryPhoto: true})}>
        <BorderLinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#E72454', '#FFC227']}
          style={{
            flex: 1,
            height: verticalScale(135),
            alignItems: 'center',
            marginBottom: verticalScale(10),
          }}>
          <View
            style={{
              height: verticalScale(130),
              width: scale(130),
              backgroundColor: '#fff',
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {currentUserProfile?.customerPhoto ? (
              <Image
                source={{url: currentUserPrimaryPhoto?.[0]?.photoUrl}}
                height={200}
                width={150}
                resizeMode="cover"
                customStyle={{borderRadius: 15}}
              />
            ) : (
              <Image
                source={GLOBAL_ASSET_URI.ADD_ICON}
                height={30}
                width={30}
                resizeMode="cover"
                customStyle={{borderRadius: 15}}
              />
            )}
          </View>
        </BorderLinearGradient>
      </TouchableOpacity>
      <View style={{flex: 1, flexDirection: 'column'}}>
        {[...Array(2)].map((_, index) => (
          <View key={index} style={{flexDirection: 'row'}}>
            {[...Array(2)].map((_, subIndex) => {
              const photoIndex = index * 2 + subIndex;
              const photo =
                photoIndex < currentUserProfile?.customerPhoto.length
                  ? currentUserProfile?.customerPhoto[photoIndex]
                  : null;
              return (
                <TouchableOpacity
                  onPress={() => openImageLibrary({primaryPhoto: false})}>
                  <BorderLinearGradient
                    key={subIndex}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={['#E72454', '#FFC227']}
                    style={{
                      height: verticalScale(65),
                      alignItems: 'center',
                      flex: 1,
                      marginHorizontal: scale(4),
                      marginBottom: verticalScale(5),
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        height: verticalScale(62),
                        width: scale(65),
                        backgroundColor: '#fff',
                        borderRadius: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      {photo && !photo.primary ? (
                        <Image
                          source={{uri: photo.photoUrl}}
                          height={100}
                          width={75}
                          resizeMode="cover"
                          customStyle={{borderRadius: 15}}
                        />
                      ) : (
                        <Image
                          source={GLOBAL_ASSET_URI.ADD_ICON}
                          height={20}
                          width={10}
                          resizeMode="cover"
                          customStyle={{borderRadius: 15}}
                        />
                      )}
                    </View>
                  </BorderLinearGradient>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
};

export default MultiplePhotoSelection;
