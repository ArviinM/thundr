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
import OTPScreen from '../../../composition/OTPScreen/OTPScreen';

// Utils
import {MOBILE_INPUT_URI} from '../../../utils/images';
import {isIosDevice, scale, verticalScale} from '../../../utils/commons';

const MobileVerificationScreen = () => {
  const navigation = useNavigation();
  const [otp, setOtp] = useState('');
  return (
    <ScreenContainer customStyle={{justifyContent: 'flex-start'}}>
      <View style={{top: verticalScale(80), alignItems: 'center'}}>
        <Image
          source={MOBILE_INPUT_URI.MOBILE_OTP_ICON}
          width={80}
          height={100}
          customStyle={{left: scale(15)}}
        />
        <Separator space={20} />
        <Text color="#E33051" weight={700}>
          Verification
        </Text>
        <Text color="#59595B" customStyle={{textAlign: 'center'}}>
          Enter OTP code sent to +63 xxxxxxxxxx.
        </Text>
      </View>
      <View style={{top: verticalScale(110)}}>
        <OTPScreen otp={otp} setOtp={setOtp} />
      </View>
      <Button
        title="Continue"
        primary
        textStyle={{weight: 400}}
        style={{
          top: verticalScale(150),
          height: verticalScale(isIosDevice() ? 30 : 40),
          width: scale(150),
        }}
        onPress={() => navigation.navigate('EmailValidationScreen')}
      />
      <View
        style={{
          top: verticalScale(260),
          paddingHorizontal: scale(isIosDevice() ? 110 : 100),
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Image
          source={MOBILE_INPUT_URI.LOCK_ICON}
          height={20}
          width={20}
          customStyle={{
            marginRight: scale(10),
            top: verticalScale(isIosDevice() ? 2 : 6),
          }}
        />
        <Text color="#59595B" customStyle={{textAlign: 'center'}}>
          Don’t share your OTP with anyone.
        </Text>
      </View>
    </ScreenContainer>
  );
};

export default MobileVerificationScreen;
