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

const FeatureNotAvailableModal = props => {
  const {displayCloseIcon} = props;
  const navigation = useNavigation();
  return (
    <Overlay
      onBackdropPress={() =>
        navigation.reset({
          index: 0,
          routes: [{name: 'DashboardTabs'}],
        })
      }
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
      isVisible={true}>
      <TouchableOpacity
        onPress={() =>
          navigation.reset({index: 0, routes: [{name: 'DashboardTabs'}]})
        }
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
        Oops! Wait lang, mars. This feature will be available soon.
      </Text>
    </Overlay>
  );
};

export default FeatureNotAvailableModal;
