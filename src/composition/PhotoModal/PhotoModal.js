import React from 'react';
import {Overlay} from 'react-native-elements';
import {isIosDevice, scale, verticalScale} from '../../utils/commons';
import {TouchableOpacity, View} from 'react-native';
import Text from '../../components/Text/Text';
import {BorderLinearGradient} from '../../screens/public/ProfileCreationScreen/Styled';
import {GLOBAL_ASSET_URI} from '../../utils/images';
import Image from '../../components/Image/Image';

const PhotoModal = props => {
  const {openPhotoModal, setOpenPhotoModal} = props;
  return (
    <BorderLinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#E72454', '#FFC227']}>
      <Overlay
        onBackdropPress={() => setOpenPhotoModal(false)}
        overlayStyle={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#808080',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: [
            {translateX: -scale(150)},
            {translateY: -verticalScale(140)},
          ],
          height: 'auto',
          width: scale(300),
          borderRadius: 20,
          padding: scale(30),
        }}
        isVisible={openPhotoModal}>
        <View
          style={{
            position: 'absolute',
            bottom: verticalScale(isIosDevice() ? 240 : 245),
            right: scale(10),
          }}>
          <TouchableOpacity onPress={() => setOpenPhotoModal(false)}>
            <Image
              source={GLOBAL_ASSET_URI.CLOSE_ICON}
              height={25}
              width={25}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: verticalScale(200),
          }}></View>
      </Overlay>
    </BorderLinearGradient>
  );
};

export default PhotoModal;
