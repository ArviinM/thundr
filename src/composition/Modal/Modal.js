// React modules
import React from 'react';
import {TouchableOpacity, View} from 'react-native';

// Third party libraries
import {Overlay} from 'react-native-elements';

// Components
import Separator from '../../components/Separator/Separator';
import Text from '../../components/Text/Text';

// Utils
import {isIosDevice, scale, verticalScale} from '../../utils/commons';
import Image from '../../components/Image/Image';
import {GLOBAL_ASSET_URI} from '../../utils/images';
import {useDispatch} from 'react-redux';
import {UPDATE_LOGIN_STATE} from '../../ducks/Login/actionTypes';
import {UPDATE_MOBILE_EMAIL_STATE} from '../../ducks/MobileEmail/actionTypes';
import {UPDATE_SSO_VALIDATION_STATE} from '../../ducks/SSOValidation/actionTypes';
import {UPDATE_PROFILE_CREATION_STATE} from '../../ducks/ProfileCreation/actionTypes';

const Modal = props => {
  const dispatch = useDispatch();
  const {modalMessage, showModal} = props;

  const handleCloseModal = () => {
    dispatch({type: UPDATE_LOGIN_STATE, newState: {showModal: false}});
    dispatch({
      type: UPDATE_MOBILE_EMAIL_STATE,
      newState: {showModal: false},
    });
    dispatch({type: UPDATE_SSO_VALIDATION_STATE, newState: {showModal: false}});
    dispatch({
      type: UPDATE_PROFILE_CREATION_STATE,
      newState: {
        showModal: false,
      },
    });
  };

  return (
    <Overlay
      onBackdropPress={handleCloseModal}
      overlayStyle={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E33051',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [
          {translateX: -scale(125)},
          {translateY: -verticalScale(40)},
        ],
        height: verticalScale(isIosDevice() ? 80 : 85),
        width: scale(250),
        borderRadius: 20,
      }}
      isVisible={showModal}>
      <View
        style={{
          position: 'absolute',
          bottom: verticalScale(isIosDevice() ? 65 : 75),
          right: scale(10),
        }}>
        <TouchableOpacity onPress={handleCloseModal}>
          <Image source={GLOBAL_ASSET_URI.CLOSE_ICON} height={25} width={25} />
        </TouchableOpacity>
      </View>
      <Text
        size={18}
        color="#fff"
        weight={700}
        customStyle={{textAlign: 'center'}}>
        {modalMessage}
      </Text>
      <Separator space={15} />
    </Overlay>
  );
};

export default Modal;
