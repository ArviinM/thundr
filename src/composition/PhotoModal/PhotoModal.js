// React modules
import React from 'react';
import {TouchableOpacity, View} from 'react-native';

// Third party libraries
import {Overlay} from 'react-native-elements';

// Components
import Image from '../../components/Image/Image';

// Utils
import {scale, verticalScale} from '../../utils/commons';
import {GLOBAL_ASSET_URI} from '../../utils/images';

const PhotoModal = props => {
  const {openPhotoModal, setOpenPhotoModal, customerPhotoUrl} = props;
  return (
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
          {translateX: -scale(140)},
          {translateY: -verticalScale(140)},
        ],
        height: 'auto',
        width: scale(280),
        borderRadius: 20,
        padding: scale(0),
      }}
      isVisible={openPhotoModal}>
      <View
        style={{
          position: 'absolute',
          bottom: verticalScale(265),
          right: scale(10),
          zIndex: 1,
        }}>
        <TouchableOpacity onPress={() => setOpenPhotoModal(false)}>
          <Image source={GLOBAL_ASSET_URI.CLOSE_ICON} height={25} width={25} />
        </TouchableOpacity>
      </View>
      <Image
        source={{uri: customerPhotoUrl}}
        height={280}
        width={280}
        resizeMode="cover"
        customStyle={{borderRadius: 20}}
      />
    </Overlay>
  );
};

export default PhotoModal;
