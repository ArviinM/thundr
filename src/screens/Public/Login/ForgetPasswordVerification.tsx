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

import {COLORS, SIZES, width} from '../../../constants/commons.ts';
import {IMAGES} from '../../../constants/images.ts';
import {RootNavigationParams} from '../../../constants/navigator.ts';
import {ForgetPasswordVerificationRequest} from '../../../types/generated.ts';
import {
  KeyboardAwareScrollView,
  KeyboardStickyView,
} from 'react-native-keyboard-controller';
import Toast from 'react-native-toast-message';
import useConfirmationAlert from '../../../components/shared/Alert.tsx';
import {useForgetPasswordVerification} from '../../../hooks/forget-password/useForgetPasswordVerification.ts';
import {useForgetPasswordValidation} from '../../../hooks/forget-password/useForgetPasswordValidation.ts';

type ForgetPasswordValidationScreenRouteProp = RouteProp<
  RootNavigationParams,
  'ForgetPasswordVerification'
>;

type ForgetPasswordValidationProps = {
  route?: ForgetPasswordValidationScreenRouteProp;
};

const ForgetPasswordVerification = ({route}: ForgetPasswordValidationProps) => {
  const {phoneNumber} = route?.params || {};

  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();
  const emailCodeInputRef = useRef<OTPTextView>(null);

  const [loading, isLoading] = useState(false);
  const [emailCodeInput, setEmailCodeInput] = useState<string>('');
  const [countdownTimer, setCountdownTimer] = useState(0);
  const [resendDisabled, setResendDisabled] = useState(false); // Initially disable
  const [resendAttempts, setResendAttempts] = useState(0);

  const emailValidation = useForgetPasswordValidation();
  const passwordVerification = useForgetPasswordVerification();
  // const emailCodeResend = useEmailCodeResend();
  const inset = useSafeAreaInsets();

  const handleCellTextChange = async (text: string, i: number) => {
    if (i === 0) {
      const clippedText = await Clipboard.getString();
      if (clippedText.slice(0, 1) === text) {
        emailCodeInputRef.current?.setValue(clippedText, true);
      }
    }
  };

  const onSubmit = async (emailCode: string) => {
    try {
      isLoading(true);
      const result = await passwordVerification.mutateAsync({
        phoneNumber: phoneNumber,
        code: emailCode,
      } as ForgetPasswordVerificationRequest);

      isLoading(false);

      if (phoneNumber) {
        navigation.navigate('PasswordReset', {
          phoneNumber: phoneNumber,
          code: result.newHash,
        });
      }
    } catch (e) {
      isLoading(false);
    }
  };

  const isEmailCodeComplete = emailCodeInput.length < 6;

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
    if (phoneNumber) {
      try {
        await emailValidation.mutateAsync({
          phoneNumber: phoneNumber,
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

  const {showConfirmationAlert} = useConfirmationAlert();
  const handleExit = () => {
    showConfirmationAlert({
      title: 'Uy, exit na?',
      message: 'Once you exit, you will be redirected back to the login page..',
      onConfirm: () => navigation.navigate('LoginValidation'),
    });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
        <KeyboardAwareScrollView bottomOffset={220} style={styles.flex}>
          <View style={styles.container}>
            <View style={styles.backButtonContainer}>
              <TouchableOpacity onPress={handleExit} style={styles.backButton}>
                <Image source={IMAGES.back} style={styles.backImage} />
              </TouchableOpacity>
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.textTitle}>Enter your code</Text>
              <Text style={styles.textSubtitle}>
                We sent a verification code to your registered email address.
              </Text>
              <View style={styles.numberContainer}>
                <OTPTextView
                  ref={emailCodeInputRef}
                  textInputStyle={styles.textInputEmailCode}
                  handleTextChange={setEmailCodeInput}
                  handleCellTextChange={handleCellTextChange}
                  inputCount={6}
                  tintColor={COLORS.primary1}
                  offTintColor={COLORS.black}
                  keyboardType="default"
                />
              </View>
              <View style={styles.bodyContainer}>
                <Text style={styles.textBody}>
                  Wala ka bang na-receive na email sis?{'\n'}Click mo 'to sis!{' '}
                  <Text
                    style={[
                      styles.resendText,
                      resendDisabled
                        ? styles.resendDisabled
                        : styles.resendEnabled,
                    ]}
                    onPress={handleResendOtp}>
                    RESEND EMAIL CODE{' '}
                    {countdownTimer > 0 && `(${countdownTimer})`}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <KeyboardStickyView offset={{closed: 0, opened: 30}}>
          <View style={styles.buttonContainer}>
            <GradientButton
              onPress={() => onSubmit(emailCodeInput)}
              text="Verify Code"
              loading={loading}
              disabled={isEmailCodeComplete}
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
  textInputEmailCode: {
    fontSize: SIZES.h3,
    fontFamily: 'Montserrat-Medium',
    borderBottomWidth: 1,
  },
  bodyContainer: {},
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

export default ForgetPasswordVerification;
