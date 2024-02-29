// React modules
import React, {useState} from 'react';
import {View} from 'react-native';

// Third party libraries
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';

// Components
import ScreenContainer from '../../../composition/ScreenContainer/ScreenContainer';
import Button from '../../../components/Button/Button';
import Separator from '../../../components/Separator/Separator';
import Image from '../../../components/Image/Image';
import Text from '../../../components/Text/Text';
import OTPScreen from '../../../composition/OTPScreen/OTPScreen';
import Spinner from '../../../components/Spinner/Spinner';

// Ducks
import {START_EMAIL_VERIFICATION} from '../../../ducks/MobileEmail/actionTypes';

// Utils
import {MOBILE_INPUT_URI} from '../../../utils/images';
import {isIosDevice, scale, verticalScale} from '../../../utils/commons';

const EmailVerificationScreen = () => {
  const dispatch = useDispatch();
  const {loading} = useSelector(state => state.mobileEmail);
  const [otp, setOtp] = useState('');
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{flexGrow: 1}}
      enableOnAndroid
      bounces={false}
      keyboardShouldPersistTaps="always">
      <ScreenContainer customStyle={{justifyContent: 'flex-start'}}>
        {loading && <Spinner visible={true} />}
        <View style={{top: verticalScale(80), alignItems: 'center'}}>
          <Image
            source={MOBILE_INPUT_URI.EMAIL_OTP_ICON}
            width={100}
            height={100}
            customStyle={{left: scale(15)}}
          />
          <Separator space={20} />
          <Text
            color="#E33051"
            weight={700}
            fontFamily="Montserrat-Regular"
            size={scale(13)}>
            Verification
          </Text>
          <Text
            color="#59595B"
            customStyle={{textAlign: 'center'}}
            fontFamily="Montserrat-Regular"
            size={scale(12)}>
            You are almost done!
          </Text>
          <Text
            color="#59595B"
            customStyle={{textAlign: 'center', paddingHorizontal: scale(70)}}
            fontFamily="Montserrat-Regular"
            size={scale(12)}>
            Enter the verification code sent to your email.
          </Text>
        </View>
        <View style={{top: verticalScale(110)}}>
          <OTPScreen
            otp={otp}
            setOtp={setOtp}
            keyboardType="default"
            restrictToNumbers={false}
          />
        </View>
        <Button
          disabled={otp.length !== 6}
          title="Continue"
          primary
          textStyle={{weight: 400}}
          style={{
            top: verticalScale(170),
            height: verticalScale(40),
            width: scale(150),
          }}
          onPress={() =>
            dispatch({type: START_EMAIL_VERIFICATION, payload: {otp}})
          }
        />
        <View
          style={{
            top: verticalScale(260),
            paddingHorizontal: scale(isIosDevice() ? 100 : 80),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={MOBILE_INPUT_URI.LOCK_ICON} height={20} width={20} />
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              size={scale(10)}
              customStyle={{
                textAlign: 'center',
                color: '#59595B',
                fontFamily: 'Montserrat-Regular',
              }}>
              Don’t share your verification code with anyone.
            </Text>
          </View>
        </View>
      </ScreenContainer>
    </KeyboardAwareScrollView>
  );
};

export default EmailVerificationScreen;
