import React, {useState} from 'react';
import ScreenContainer from '../../../composition/ScreenContainer/ScreenContainer';
import Button from '../../../components/Button/Button';
import Separator from '../../../components/Separator/Separator';
import {useNavigation} from '@react-navigation/native';
import Image from '../../../components/Image/Image';
import {MOBILE_INPUT_URI} from '../../../utils/images';
import Text from '../../../components/Text/Text';
import {View} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../../utils/commons';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

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
        <Text color="#E33051">Verification</Text>
        <Text color="#59595B" customStyle={{textAlign: 'center'}}>
          Enter OTP code sent to +63 xxxxxxxxxx.
        </Text>
      </View>
      <View style={{top: verticalScale(110)}}>
        <SmoothPinCodeInput
          codeLength={6}
          keyboardType="numeric"
          restrictToNumbers
          // password
          // mask="●"
          animationFocused={null}
          value={otp}
          cellStyleFocused={{borderColor: 'transparent', borderWidth: 2}}
          cellSize={scale(50)}
          maskDelay={0}
          cellSpacing={scale(10)}
          cellStyle={{
            flex: 1,
            borderRadius: 8,
            borderWidth: 2,
            height: verticalScale(40),
            width: scale(42),
            borderColor: 'transparent',
            backgroundColor: '#fff',
          }}
          textStyle={{
            fontSize: moderateScale(18),
            color: '#E33051',
            fontWeight: 700,
          }}
          onTextChange={text => {
            setOtp(text);
          }}
        />
      </View>
      <Button
        title="Continue"
        primary
        textStyle={{weight: 400}}
        style={{
          top: verticalScale(150),
          height: verticalScale(30),
          width: scale(150),
        }}
        onPress={() => navigation.navigate('EmailValidationScreen')}
      />
      <View
        style={{
          top: verticalScale(260),
          paddingHorizontal: scale(110),
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Image
          source={MOBILE_INPUT_URI.LOCK_ICON}
          height={20}
          width={20}
          customStyle={{marginRight: scale(10), top: verticalScale(2)}}
        />
        <Text color="#59595B" customStyle={{textAlign: 'center'}}>
          Don’t share your OTP with anyone.
        </Text>
      </View>
    </ScreenContainer>
  );
};

export default MobileVerificationScreen;
