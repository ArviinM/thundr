import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';

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
import {EmailValidationRequest} from '../../../types/generated.ts';
import {useEmailValidation} from '../../../hooks/registration/useEmailValidation.ts';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  KeyboardAwareScrollView,
  KeyboardStickyView,
} from 'react-native-keyboard-controller';
import useConfirmationAlert from '../../../components/shared/Alert.tsx';

type EmailValidationScreenRouteProp = RouteProp<
  RootNavigationParams,
  'EmailValidation'
>;

type EmailValidationProps = {
  route?: EmailValidationScreenRouteProp;
};

const EmailValidation = ({route}: EmailValidationProps) => {
  const {username, challengeName, session} = route?.params || {};

  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();
  const textInputRef = useRef<TextInput>(null);

  const [loading, isLoading] = useState(false);

  const emailValidation = useEmailValidation();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email('Your email address sis is invalid!')
      .required('Nako mars, we need your email po!'),
  });

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  }, []);

  const onSubmit = async (data: {email: string}) => {
    try {
      await schema.validate(data);
      isLoading(true);

      const result = await emailValidation.mutateAsync({
        phoneNumber: username,
        email: data.email,
        session: session,
        challengeName: challengeName,
      } as EmailValidationRequest);

      isLoading(false);
      navigation.navigate('EmailVerification', result);
    } catch (error) {
      // Handle validation errors
      if (error instanceof yup.ValidationError) {
        console.error(error.message);
        isLoading(false);
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
        <StepProgressBar currentStep={3} totalSteps={6} />
        <KeyboardAwareScrollView bottomOffset={220} style={styles.flex}>
          <View style={styles.container}>
            <View style={styles.backButtonContainer}>
              <TouchableOpacity onPress={handleExit} style={styles.backButton}>
                <Image source={IMAGES.back} style={styles.backImage} />
              </TouchableOpacity>
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.textTitle}>Enter your email, sis!</Text>
              <Text style={styles.textSubtitle}>
                Para we can stay connected with you, mare.
              </Text>
              <View style={styles.numberContainer}>
                <View style={styles.textInputContainer}>
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
                        ref={textInputRef}
                        style={styles.textInputEmail}
                        autoComplete="email"
                        keyboardType="email-address"
                        placeholder="example@thundr.ph"
                        inputMode={'email'}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        autoCapitalize="none"
                        selectionColor={COLORS.primary1}
                      />
                    )}
                    name="email"
                  />
                  {errors.email && (
                    <Text style={styles.errorText}>{errors.email.message}</Text>
                  )}
                </View>
              </View>
              <View style={styles.bodyContainer}>
                <Text style={styles.textBody}>
                  Get ready for exclusive deals, insider updates, and all the
                  good stuff, sis!
                </Text>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <KeyboardStickyView offset={{closed: -20, opened: 0}}>
          <View style={styles.buttonContainer}>
            <GradientButton
              onPress={handleSubmit(onSubmit)}
              text="Next"
              loading={loading}
              disabled={!isValid}
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
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  numberCodeContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '23%',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.black,
  },
  textNumberCode: {
    color: COLORS.black,
    fontSize: SIZES.h3,
    fontFamily: 'Montserrat-Medium',
  },
  textInputContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
  },
  textInputEmail: {
    backgroundColor: COLORS.white,
    fontSize: SIZES.h3,
    fontFamily: 'Montserrat-Medium',
    padding: 0,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.black,
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
  errorText: {
    marginTop: 8,
    color: COLORS.primary1,
    fontFamily: 'Montserrat-Regular',
    letterSpacing: -0.8,
    fontSize: SIZES.h6,
  },
});

export default EmailValidation;
