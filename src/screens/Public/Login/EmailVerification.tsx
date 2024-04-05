import React, {useRef, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

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
import {useEmailVerification} from '../../../hooks/registration/useEmailVerification.ts';
import {EmailVerificationRequest} from '../../../types/generated.ts';

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

  const emailVerification = useEmailVerification();

  const handleCellTextChange = async (text: string, i: number) => {
    if (i === 0) {
      const clippedText = await Clipboard.getString();
      if (clippedText.slice(0, 1) === text) {
        emailCodeInputRef.current?.setValue(clippedText, true);
      }
    }
  };

  const onSubmit = async (emailCode: string) => {
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
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
        <StepProgressBar currentStep={2} totalSteps={10} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.flex}>
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
                  Wala pa rin email, mars? RESEND EMAIL CODE
                </Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <GradientButton
                onPress={() => onSubmit(emailCodeInput)}
                text="Next"
                loading={loading}
                // disabled={isOTPIncomplete}
                buttonStyle={styles.buttonStyle}
                textStyle={styles.buttonTextStyle}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
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
  titleContainer: {flex: 0.9, marginHorizontal: 30},
  textTitle: {
    fontSize: SIZES.h2,
    fontFamily: 'ClimateCrisis-Regular',
    letterSpacing: -0.6,
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
});

export default EmailVerification;
