// React modules
import React from 'react';
import {Linking, TouchableOpacity, View} from 'react-native';

// Components
import Image from '../../../components/Image/Image';
import Text from '../../../components/Text/Text';
import Separator from '../../../components/Separator/Separator';
import SettingsHeader from '../../../composition/SettingsHeader/SettingsHeader';

// Utils
import {SETTINGS_URI} from '../../../utils/images';
import {scale, verticalScale} from '../../../utils/commons';

const SecurityAndPrivacy = () => {
  const OpenURLButton = ({url}) => {
    const handlePress = async () => {
      await Linking.openURL(url);
    };

    return (
      <TouchableOpacity onPress={handlePress}>
        <Text color="#48B5C0" customStyle={{textAlign: 'center'}}>
          https://thundr.ph/
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{top: verticalScale(20)}}>
      <SettingsHeader />
      <View style={{alignItems: 'center', paddingHorizontal: scale(20)}}>
        <Image source={SETTINGS_URI.PRIVACY_POLICY} height={100} width={100} />
        <Separator space={10} />
        <Text
          fontFamily="Montserrat-Bold"
          weight={700}
          size={20}
          color="#808080">
          Privacy Policy
        </Text>
        <Separator space={10} />
        <Text
          fontFamily="Montserrat-Regular"
          customStyle={{textAlign: 'center'}}
          color="#808080">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <Separator space={50} />
        <OpenURLButton url="https://thundr.ph/" />
      </View>
    </View>
  );
};

export default SecurityAndPrivacy;
