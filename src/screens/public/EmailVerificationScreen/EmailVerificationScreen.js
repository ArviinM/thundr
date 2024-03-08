// React modules
import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

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
import {
  START_EMAIL_VALIDATION,
  START_EMAIL_VERIFICATION,
} from '../../../ducks/MobileEmail/actionTypes';

// Utils
import {MOBILE_INPUT_URI} from '../../../utils/images';
import {isIosDevice, scale, verticalScale} from '../../../utils/commons';

const EmailVerificationScreen = () => {
  const dispatch = useDispatch();
  const {loading, mobileEmailData} = useSelector(state => state.mobileEmail);
  const [otp, setOtp] = useState('');

  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const [countdown, setCountdown] = useState(45); // Initial countdown set to 45 seconds

  const handleResendOTP = () => {
    setResendDisabled(true);

    const newTimer = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);

    if (resendCount < 3) {
      setTimeout(() => {
        clearInterval(newTimer);
        if (resendCount === 0) {
          setCountdown(90); // Change countdown to 90 seconds for the second resend
        } else if (resendCount === 1) {
          setCountdown(180); // Change countdown to 180 seconds for the third resend
        } else {
          setCountdown(0);
          setResendDisabled(true); // Disable resend after the third resend
        }
        setResendCount(prevCount => prevCount + 1);
        setResendDisabled(false); // Enable resend button after countdown finishes
      }, countdown * 1000);
    } else {
      setResendDisabled(true);
    }

    if (resendCount !== 0) {
      // Only dispatch if a resend is requested
      console.log('Resending Email OTP...');
      dispatch({
        type: START_EMAIL_VALIDATION,
        payload: {
          email: mobileEmailData.email,
          phoneNumber: mobileEmailData.data.username,
          session: mobileEmailData.data.session,
        },
      });
    }
  };

  useEffect(() => {
    handleResendOTP(); // Start countdown on initial render
  }, []);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.scrollView}
      bounces={false}
      keyboardShouldPersistTaps="always">
      <ScreenContainer customStyle={styles.screenContainer}>
        {loading && <Spinner visible={true} />}
        <View style={styles.content}>
          <View style={styles.topContainer}>
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
              customStyle={styles.textContent}
              fontFamily="Montserrat-Regular"
              size={scale(12)}>
              You are almost done!
            </Text>
            <Text
              color="#59595B"
              customStyle={styles.textContent}
              fontFamily="Montserrat-Regular"
              size={scale(12)}>
              Enter the verification code sent to your email.
            </Text>
          </View>
          <View style={styles.otpContainer}>
            <OTPScreen
              otp={otp}
              setOtp={setOtp}
              keyboardType="default"
              restrictToNumbers={false}
            />
          </View>
          <View>
            <Button
              disabled={otp.length !== 6}
              title="Continue"
              primary
              style={styles.button}
              onPress={() =>
                dispatch({type: START_EMAIL_VERIFICATION, payload: {otp}})
              }
            />
          </View>
          <View style={styles.resendContainer}>
            <TouchableOpacity
              disabled={resendDisabled}
              style={styles.container}
              onPress={handleResendOTP}>
              <Text
                fontFamily="Montserrat-Regular"
                weight={400}
                size={scale(10)}
                color="#59595B">
                Didn't receive a code?{' '}
              </Text>
              <Text
                fontFamily="Montserrat-Bold"
                weight={700}
                size={scale(10)}
                customStyle={styles.text}
                color={resendDisabled ? '#59595B' : '#E33051'}>
                {resendDisabled ? `RESEND OTP ${countdown}s` : 'RESEND OTP'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footerContainer}>
            <Image source={MOBILE_INPUT_URI.LOCK_ICON} height={20} width={20} />
            <View style={styles.footerViewContainer}>
              <Text
                size={scale(10)}
                fontFamily="Montserrat-Regular"
                color="#59595B"
                customStyle={styles.textCenter}>
                Don’t share your verification code with anyone.
              </Text>
            </View>
          </View>
        </View>
      </ScreenContainer>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  resendContainer: {
    top: verticalScale(170),
    textAlign: 'center',
  },
  container: {
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
  },
  text: {
    textDecorationLine: 'underline',
  },
  scrollView: {flexGrow: 1},
  screenContainer: {justifyContent: 'flex-start'},
  content: {
    flex: 1,
    alignItems: 'center',
  },
  topContainer: {top: verticalScale(80), alignItems: 'center'},
  footerContainer: {
    top: verticalScale(240),
    paddingHorizontal: scale(isIosDevice() ? 100 : 80),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCenter: {textAlign: 'center'},
  textContent: {textAlign: 'center', paddingHorizontal: scale(30)},
  button: {
    top: verticalScale(150),
    height: verticalScale(40),
    width: scale(150),
  },
  otpContainer: {top: verticalScale(110)},
});

export default EmailVerificationScreen;
