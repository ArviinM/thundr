// React modules
import React from 'react';

// Third party libraries
import {useNavigation} from '@react-navigation/native';
import {Overlay} from 'react-native-elements';

// Components
import Text from '../../components/Text/Text';

// Utils
import {scale, verticalScale} from '../../utils/commons';
import {TouchableOpacity} from 'react-native';
import Image from '../../components/Image/Image';
import {GLOBAL_ASSET_URI} from '../../utils/images';
import Separator from '../../components/Separator/Separator';
import Button from '../../components/Button/Button';

const DeactivateAccountModal = props => {
  const {
    fromLogin,
    setDisplayDeactivateModal,
    displayDeactivateModal,
    handleDeactivate,
  } = props;

  const handleNavigation = () => {
    setDisplayDeactivateModal(false);
  };

  return (
    <Overlay
      onBackdropPress={handleNavigation}
      overlayStyle={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E43C59',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [
          {translateX: -scale(125)},
          {translateY: -verticalScale(20)},
        ],
        height: 'auto',
        width: scale(250),
        borderRadius: 20,
        borderWidth: 3,
        borderColor: '#FEBC29',
      }}
      isVisible={displayDeactivateModal}>
      <TouchableOpacity
        onPress={handleNavigation}
        style={{
          position: 'absolute',
          top: verticalScale(-10),
          left: scale(225),
        }}>
        <Image source={GLOBAL_ASSET_URI.CLOSE_ICON} width={25} height={25} />
      </TouchableOpacity>
      <Text
        size={18}
        color="#fff"
        fontFamily="Montserrat-Bold"
        weight={700}
        customStyle={{textAlign: 'center'}}>
        {fromLogin
          ? 'You have successfully deactivated your account, sis. You may reactivate your account after seven days.'
          : 'Upon deactivation, you may reactivate your account only after seven days. Gora, sis?'}
      </Text>
      <Separator space={20} />
      {!fromLogin && (
        <Button
          title="Deactivate"
          onPress={handleDeactivate}
          style={{width: scale(200), backgroundColor: '#fff'}}
          textColor="#E43C59"
        />
      )}
    </Overlay>
  );
};

export default DeactivateAccountModal;
