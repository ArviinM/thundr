// React modules
import React from 'react';
import {TouchableOpacity, View} from 'react-native';

// Third party libraries
import {useNavigation} from '@react-navigation/native';

// Components
import Image from '../../components/Image/Image';
import Text from '../../components/Text/Text';

// Utils
import {scale, verticalScale} from '../../utils/commons';
import {GLOBAL_ASSET_URI} from '../../utils/images';

const SettingsHeader = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={{zIndex: 1}}>
        <TouchableOpacity
          style={{left: scale(20)}}
          onPress={() => navigation.goBack()}>
          <Image source={GLOBAL_ASSET_URI.BACK_ICON} height={25} width={25} />
        </TouchableOpacity>
      </View>
      <View style={{top: verticalScale(-15)}}>
        <Text
          color="#E43C59"
          fontFamily="ClimateCrisis-Regular"
          size={23}
          customStyle={{textAlign: 'center'}}>
          SETTINGS
        </Text>
      </View>
    </>
  );
};

export default SettingsHeader;
