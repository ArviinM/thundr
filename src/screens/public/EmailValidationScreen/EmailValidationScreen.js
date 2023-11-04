// React modules
import React, {useState} from 'react';
import {View} from 'react-native';

// Third party libraries
import {useNavigation} from '@react-navigation/native';

// Components
import ScreenContainer from '../../../composition/ScreenContainer/ScreenContainer';
import Button from '../../../components/Button/Button';
import Separator from '../../../components/Separator/Separator';
import Image from '../../../components/Image/Image';
import Text from '../../../components/Text/Text';
import TextInput from '../../../composition/TextInput/TextInput';

// Utils
import {MOBILE_INPUT_URI} from '../../../utils/images';
import {isIosDevice, scale, verticalScale} from '../../../utils/commons';

const EmailValidationScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  return (
    <ScreenContainer customStyle={{justifyContent: 'flex-start'}}>
      <View style={{top: verticalScale(80), alignItems: 'center'}}>
        <Image source={MOBILE_INPUT_URI.EMAIL_ICON} width={80} height={100} />
        <Separator space={20} />
        <Text color="#E33051" weight={700}>
          Add Email
        </Text>
        <Text
          color="#59595B"
          customStyle={{paddingHorizontal: scale(70), textAlign: 'center'}}>
          Enter your email address to give added security to your account.
        </Text>
        <View>
          <TextInput
            inputStyle={{
              alignItems: 'center',
              borderRadius: 30,
              paddingVertical: verticalScale(10),
              paddingHorizontal: scale(20),
              backgroundColor: '#fff',
              width: scale(230),
            }}
            placeholder=""
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>
      </View>
      <Button
        title="Continue"
        primary
        textStyle={{weight: 400}}
        style={{
          top: verticalScale(105),
          height: verticalScale(isIosDevice() ? 30 : 40),
          width: scale(150),
        }}
        onPress={() => navigation.navigate('EmailVerificationScreen')}
      />
      <View
        style={{
          top: verticalScale(260),
          paddingHorizontal: scale(isIosDevice() ? 80 : 65),
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Image
          source={MOBILE_INPUT_URI.LOCK_ICON}
          height={20}
          width={20}
          customStyle={{
            marginRight: scale(10),
            top: verticalScale(isIosDevice() ? 3 : 7),
          }}
        />
        <Text color="#59595B" customStyle={{textAlign: 'center'}}>
          We never share this with anyone and it won’t appear on your profile.
        </Text>
      </View>
    </ScreenContainer>
  );
};

export default EmailValidationScreen;
