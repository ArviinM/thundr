import React, {useRef, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Clipboard from '@react-native-clipboard/clipboard';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
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

  const mobileVerification = useMobileVerification();

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
              <View style={styles.bodyContainer}>
                <Text style={styles.textBody}>
                  Wala pa rin text, mars? RESEND OTP
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
});

export default MobileVerification;
