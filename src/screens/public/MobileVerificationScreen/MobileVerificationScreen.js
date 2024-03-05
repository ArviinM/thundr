// React modules
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

// Third party libraries
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

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
  START_MOBILE_VALIDATION,
  START_MOBILE_VERIFICATION,
} from '../../../ducks/MobileEmail/actionTypes';
import {
  START_SSO_MOBILE_VALIDATION,
  START_SSO_MOBILE_VERIFICATION,
} from '../../../ducks/SSOValidation/actionTypes';

// Utils
import {MOBILE_INPUT_URI} from '../../../utils/images';
import {isIosDevice, scale, verticalScale} from '../../../utils/commons';

const MobileVerificationScreen = () => {
  const dispatch = useDispatch();
  const {loading, mobileEmailData} = useSelector(state => state.mobileEmail);
  const {loginViaSSO, loading: ssoLoading} = useSelector(
    state => state.ssoValidation,
  );
  const [otp, setOtp] = useState('');

  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const [countdown, setCountdown] = useState(45); // Initial countdown set to 45 seconds

  const handleResendOTP = () => {
    setResendDisabled(true);

    const newTimer = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(newTimer);
      if (resendCount === 0) {
        setCountdown(90); // Change countdown to 90 seconds for the second resend
      } else if (resendCount === 1) {
        setCountdown(180); // Change countdown to 180 seconds for the third resend
      } else {
        setResendDisabled(true); // Disable resend after the third resend
      }
      setResendCount(prevCount => prevCount + 1);
      setResendDisabled(false);
    }, countdown * 1000);

    if (resendCount !== 0) {
      // Only dispatch if a resend is requested
      console.log('Resending OTP...');
      if (!loginViaSSO) {
        dispatch({
          type: START_MOBILE_VALIDATION,
          payload: {
            mobileNumber: mobileEmailData.data.username,
          },
        });
      } else {
        dispatch({
          type: START_SSO_MOBILE_VALIDATION,
          payload: {
            mobileNumber: mobileEmailData.data.username,
          },
        });
      }
    }
  };

  useEffect(() => {
    handleResendOTP(); // Start countdown on initial render
  }, []);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.viewContainer}
      enableOnAndroid
      bounces={false}
      keyboardShouldPersistTaps="always">
      <ScreenContainer customStyle={styles.screenContainer}>
        {(loading || ssoLoading) && <Spinner visible={true} />}
        <View style={styles.content}>
          <View style={styles.topContainer}>
            <Image
              source={MOBILE_INPUT_URI.MOBILE_OTP_ICON}
              width={80}
              height={100}
              customStyle={styles.mobileIcon}
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
              customStyle={styles.textCenter}
              fontFamily="Montserrat-Regular"
              size={scale(12)}>
              Enter OTP code sent to +63XXXXXXXXXX.
            </Text>
          </View>
          <View style={styles.otpContainer}>
            <OTPScreen otp={otp} setOtp={setOtp} />
          </View>
          <View>
            <Button
              disabled={otp.length !== 6}
              title="Continue"
              primary
              textStyle={{weight: 400}}
              style={styles.button}
              onPress={() => {
                !loginViaSSO
                  ? dispatch({
                      type: START_MOBILE_VERIFICATION,
                      payload: {
                        otp,
                      },
                    })
                  : dispatch({
                      type: START_SSO_MOBILE_VERIFICATION,
                      payload: {
                        otp,
                      },
                    });
              }}
            />
          </View>
          <View style={styles.resendContainer}>
            <TouchableOpacity
              disabled={resendDisabled}
              style={styles.textOTPContainer}
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
        </View>
        <View style={styles.footerContainer}>
          <Image source={MOBILE_INPUT_URI.LOCK_ICON} height={20} width={20} />
          <View style={styles.lockContainer}>
            <Text
              size={scale(10)}
              fontFamily="Montserrat-Regular"
              color="#59595B"
              customStyle={styles.textCenter}>
              Don't share your OTP with anyone
            </Text>
          </View>
        </View>
      </ScreenContainer>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  resendContainer: {
    top: verticalScale(170),
    width: scale(200),
    textAlign: 'center',
  },
  textOTPContainer: {
    flexDirection: 'row',
    textAlign: 'center',
  },
  text: {
    textDecorationLine: 'underline',
  },
  footerContainer: {
    bottom: scale(50),
    paddingHorizontal: scale(isIosDevice() ? 80 : 65),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
  button: {
    top: verticalScale(150),
    height: verticalScale(40),
    width: scale(150),
  },
  viewContainer: {flexGrow: 1},
  screenContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  topContainer: {top: verticalScale(80), alignItems: 'center'},
  mobileIcon: {left: scale(15)},
  otpContainer: {top: verticalScale(110)},
  content: {
    flex: 1,
    alignItems: 'center',
  },
});

export default MobileVerificationScreen;
