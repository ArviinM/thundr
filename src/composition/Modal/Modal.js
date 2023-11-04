// React modules
import React from 'react';
import {TouchableOpacity} from 'react-native';

// Third party libraries
import {Overlay} from 'react-native-elements';

// Components
import Separator from '../../components/Separator/Separator';
import Text from '../../components/Text/Text';

// Utils
import {scale, verticalScale} from '../../utils/commons';

const Modal = props => {
  const {modalMessage, handleCloseModal} = props;
  return (
    <Overlay
      overlayStyle={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [
          {translateX: -scale(100)},
          {translateY: -verticalScale(50)},
        ],
        height: verticalScale(100),
        width: scale(200),
        borderRadius: 20,
      }}
      isVisible>
      <Text customStyle={{textAlign: 'center'}}>{modalMessage}</Text>
      <Separator space={15} />
      <TouchableOpacity onPress={handleCloseModal}>
        <Text color="#add8e6" weight="700">
          Okay
        </Text>
      </TouchableOpacity>
    </Overlay>
  );
};

export default Modal;
