// React modules
import React from 'react';
import {Linking, TouchableOpacity, View} from 'react-native';

// Components
import Text from '../../../components/Text/Text';
import Image from '../../../components/Image/Image';
import SettingsHeader from '../../../composition/SettingsHeader/SettingsHeader';
import Separator from '../../../components/Separator/Separator';

// Utils
import {scale, verticalScale} from '../../../utils/commons';
import {SETTINGS_URI} from '../../../utils/images';

const ContactUs = () => {
  const openEmailApp = () => {
    const url = `mailto:hello@thundr.ph`;
    Linking.openURL(url);
  };

  return (
    <View style={{top: verticalScale(20)}}>
      <SettingsHeader />
      <View
        style={{
          alignItems: 'center',
          paddingHorizontal: scale(50),
          top: verticalScale(60),
        }}>
        <Image source={SETTINGS_URI.CONTACT_US} height={85} width={120} />
        <Text
          size={19}
          weight={700}
          color="#808080"
          fontFamily="Montserrat-Bold"
          customStyle={{textAlign: 'center'}}>
          Any feedback, comments, or suggestions? Tara, chika tayo!
        </Text>
        <Separator space={20} />
        <TouchableOpacity onPress={openEmailApp}>
          <Text color="#48B5C0" size={20}>
            hello@thundr.ph
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ContactUs;
