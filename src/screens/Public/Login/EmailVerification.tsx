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
import {useEmailVerification} from '../../../hooks/registration/useEmailVerification.ts';
import {EmailVerificationRequest} from '../../../types/generated.ts';
import {
  KeyboardAwareScrollView,
  KeyboardStickyView,
} from 'react-native-keyboard-controller';
import {useEmailCodeResend} from '../../../hooks/registration/useEmailCodeResend.ts';
import Toast from 'react-native-toast-message';
import useConfirmationAlert from '../../../components/shared/Alert.tsx';

type EmailVerificationScreenRouteProp = RouteProp<
  RootNavigationParams,
  'EmailVerification'
>;

type EmailVerificationProps = {
  route?: EmailVerificationScreenRouteProp;
};

const EmailVerification = ({route}: EmailVerificationProps) => {
  const {username, challengeName, session, email} = route?.params || {};

  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();
  const emailCodeInputRef = useRef<OTPTextView>(null);

  const [loading, isLoading] = useState(false);
  const [emailCodeInput, setEmailCodeInput] = useState<string>('');
  const [countdownTimer, setCountdownTimer] = useState(0);
  const [resendDisabled, setResendDisabled] = useState(false); // Initially disable
  const [resendAttempts, setResendAttempts] = useState(0);

  const emailVerification = useEmailVerification();
  const emailCodeResend = useEmailCodeResend();
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
      console.log(emailCode);

      isLoading(true);

      const result = await emailVerification.mutateAsync({
        phoneNumber: username,
        session: session,
        email: email,
        challengeName: challengeName,
        challengeAnswer: emailCode,
      } as EmailVerificationRequest);

      isLoading(false);

      navigation.navigate('PasswordCreation', result);
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
    if (username && session && email) {
      try {
        await emailCodeResend.mutateAsync({
          phoneNumber: username,
          session: session,
          email: email,
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
      title: 'Uy, exit na agad?',
      message:
        'Cancelled na talaga registration mo ha? Lahat ng info mo mawawala, okay lang?',
      onConfirm: () => navigation.navigate('Login'),
    });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
        <StepProgressBar currentStep={4} totalSteps={6} />
        <KeyboardAwareScrollView bottomOffset={220} style={styles.flex}>
          <View style={styles.container}>
            <View style={styles.backButtonContainer}>
              <TouchableOpacity onPress={handleExit} style={styles.backButton}>
                <Image source={IMAGES.back} style={styles.backImage} />
              </TouchableOpacity>
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.textTitle}>Enter your code.</Text>
              <Text style={styles.textSubtitle}>{email}</Text>
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
                  Wala pa rin email, mars?{' '}
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
        <KeyboardStickyView offset={{closed: -20, opened: 0}}>
          <View style={styles.buttonContainer}>
            <GradientButton
              onPress={() => onSubmit(emailCodeInput)}
              text="Next"
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

export default EmailVerification;
