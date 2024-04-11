import React, {useRef, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Clipboard from '@react-native-clipboard/clipboard';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import OTPTextView from 'react-native-otp-textinput';

import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';

import GradientButton from '../../../components/shared/GradientButton.tsx';
import StepProgressBar from '../../../components/shared/StepProgressBar.tsx';

import {COLORS, SIZES, width} from '../../../constants/commons.ts';
import {IMAGES} from '../../../constants/images.ts';
import {RootNavigationParams} from '../../../constants/navigator.ts';
import {useMobileVerification} from '../../../hooks/registration/useMobileVerification.ts';
import {MobileVerificationRequest} from '../../../types/generated.ts';
import {
  KeyboardAwareScrollView,
  KeyboardStickyView,
} from 'react-native-keyboard-controller';
import {useMobileResendOTP} from '../../../hooks/registration/useMobileResendOTP.ts';
import Toast from 'react-native-toast-message';

type MobileVerificationScreenRouteProp = RouteProp<
  RootNavigationParams,
  'MobileVerification'
>;

type MobileVerificationProps = {
  route?: MobileVerificationScreenRouteProp;
};

const MobileVerification = ({route}: MobileVerificationProps) => {
  const {username, challengeName, session} = route?.params || {};

  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();
  const otpInputRef = useRef<OTPTextView>(null);

  const [loading, isLoading] = useState(false);
  const [otpInput, setOtpInput] = useState<string>('');

  const [countdownTimer, setCountdownTimer] = useState(0);
  const [resendDisabled, setResendDisabled] = useState(false); // Initially disable
  const [resendAttempts, setResendAttempts] = useState(0);

  const mobileVerification = useMobileVerification();
  const mobileResendOTP = useMobileResendOTP();

  const inset = useSafeAreaInsets();

  const handleCellTextChange = async (text: string, i: number) => {
    if (i === 0) {
      const clippedText = await Clipboard.getString();
      if (clippedText.slice(0, 1) === text) {
        otpInputRef.current?.setValue(clippedText, true);
      }
    }
  };

  const onSubmit = async (otp: string) => {
    try {
      isLoading(true);

      const result = await mobileVerification.mutateAsync({
        phoneNumber: username,
        session: session,
        challengeName: challengeName,
        challengeAnswer: otp,
      } as MobileVerificationRequest);

      isLoading(false);

      navigation.navigate('EmailValidation', result);
    } catch (e) {
      isLoading(false);
    }
  };

  const isOtpComplete = otpInput.length < 6;

  const startTimer = () => {
    let duration = 45; // Adjust as needed based on attempt times
    if (resendAttempts === 1) {
      duration = 90;
    } else if (resendAttempts === 2) {
      duration = 180;
    }

    setCountdownTimer(duration);
    setResendDisabled(true);

    const timerId = setInterval(() => {
      setCountdownTimer(prev => {
        if (prev <= 1) {
          clearInterval(timerId);
          setResendDisabled(false);
          return 0;
        } else {
          return prev - 1;
        }
      });
    }, 1000);
  };

  const handleResendOtp = async () => {
    if (resendAttempts >= 3) {
      setResendDisabled(true);
      // Handle what happens if limit is reached
      Toast.show({
        type: 'THNRWaring',
        props: {title: 'Maximum OTP Resend Attempts Reached!'},
        position: 'top',
        topOffset: inset.top + 20,
      });
      return;
    }

    startTimer();
    if (username && session) {
      try {
        await mobileResendOTP.mutateAsync({
          phoneNumber: username,
          session: session,
        });
        Toast.show({
          type: 'THNRSuccess',
          props: {title: 'Your OTP has been resent!'},
          position: 'top',
          topOffset: inset.top + 20,
        });
        setResendAttempts(resendAttempts + 1);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top']} style={styles.container}>
        <StepProgressBar currentStep={2} totalSteps={6} />
        <KeyboardAwareScrollView bottomOffset={220} style={styles.flex}>
          <View style={styles.container}>
            <View style={styles.backButtonContainer}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}>
                <Image source={IMAGES.back} style={styles.backImage} />
              </TouchableOpacity>
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.textTitle}>Enter your code.</Text>
              <Text style={styles.textSubtitle}>{username}</Text>
              <View style={styles.numberContainer}>
                <OTPTextView
                  ref={otpInputRef}
                  // containerStyle={styles.textInputContainer}
                  textInputStyle={styles.textInputNumber}
                  handleTextChange={setOtpInput}
                  handleCellTextChange={handleCellTextChange}
                  inputCount={6}
                  tintColor={COLORS.primary1}
                  offTintColor={COLORS.black}
                  // inputCellLength={1}
                  keyboardType="numeric"
                />
              </View>
              <View style={[styles.bodyContainer]}>
                {/*Add OTP Resend in RESEND OTP TEXT*/}
                <Text style={[styles.textBody]}>
                  Wala pa rin text, mars?{' '}
                  <Text
                    style={[
                      styles.resendText,
                      resendDisabled
                        ? styles.resendDisabled
                        : styles.resendEnabled,
                    ]}
                    onPress={handleResendOtp}>
                    RESEND OTP {countdownTimer > 0 && `(${countdownTimer})`}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <KeyboardStickyView offset={{closed: -20, opened: 0}}>
          <View style={styles.buttonContainer}>
            <GradientButton
              onPress={() => onSubmit(otpInput)}
              text="Next"
              loading={loading}
              disabled={isOtpComplete}
              buttonStyle={styles.buttonStyle}
              textStyle={styles.buttonTextStyle}
            />
          </View>
        </KeyboardStickyView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
  container: {backgroundColor: COLORS.white, flex: 1},
  backButtonContainer: {flex: 0.1, marginTop: 32, marginLeft: 14},
  backButton: {width: 30, alignItems: 'flex-start'},
  backImage: {alignSelf: 'flex-start'},
  titleContainer: {flex: 0.9, marginHorizontal: 30, marginTop: 30},
  textTitle: {
    fontSize: SIZES.h2,
    fontFamily: 'ClimateCrisis-Regular',
    color: COLORS.primary1,
  },
  textSubtitle: {
    fontSize: SIZES.h5,
    fontFamily: 'Montserrat-SemiBold',
    color: COLORS.gray,
    letterSpacing: -0.6,
  },
  numberContainer: {
    marginTop: 100,
    marginBottom: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  numberCodeContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: COLORS.black,
    width: '13%',
  },
  textNumberCode: {
    color: COLORS.black,
    fontSize: SIZES.h3,
    fontFamily: 'Montserrat-Medium',
  },
  textInputContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 16,
    flex: 1,
  },
  textInputNumber: {
    fontSize: SIZES.h3,
    fontFamily: 'Montserrat-Medium',
    borderBottomWidth: 1,
  },
  bodyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textBody: {
    fontSize: SIZES.h5,
    fontFamily: 'Montserrat-SemiBold',
    color: COLORS.gray,
    letterSpacing: -0.6,
  },
  buttonContainer: {marginHorizontal: 30, alignItems: 'center'},
  buttonStyle: {
    alignItems: 'center',
    maxWidth: width,
    width: width - 64,
    height: 50,
    justifyContent: 'center',
    borderRadius: 30,
    marginBottom: 12,
  },
  buttonTextStyle: {
    letterSpacing: -0.4,
    fontFamily: 'Montserrat-SemiBold',
    color: COLORS.white,
    fontSize: SIZES.h5,
  },
  resendText: {
    color: COLORS.primary1, // Color when enabled
    fontFamily: 'Montserrat-SemiBold',
  },
  resendEnabled: {
    color: COLORS.primary1,
  },
  resendDisabled: {
    color: COLORS.gray,
  },
});

export default MobileVerification;
