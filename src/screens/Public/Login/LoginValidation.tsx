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
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import GradientButton from '../../../components/shared/GradientButton.tsx';
import {useAuth} from '../../../providers/Auth.tsx';
import {
  KeyboardAwareScrollView,
  KeyboardStickyView,
} from 'react-native-keyboard-controller';

import {COLORS, height, SIZES, width} from '../../../constants/commons.ts';
import {IMAGES} from '../../../constants/images.ts';
import {RootNavigationParams} from '../../../constants/navigator.ts';

import {AuthDataRequest} from '../../../types/generated.ts';

const LoginValidation = () => {
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();
  const textInputRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null); // Ref for password input

  const [loading, isLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const auth = useAuth();

  const validationSchema = yup.object().shape({
    phoneNumber: yup
      .string()
      .required('Phone number is required')
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
    password: yup
      .string()
      .required('Nako mars, we need your password!')
      .min(8, 'Password must be at least 8 characters.'),
  });

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  }, []);

  const onSubmit = async (data: AuthDataRequest) => {
    const withNumberCode = `+63${data.phoneNumber}`;
    isLoading(true);

    const signInData: AuthDataRequest = {
      phoneNumber: withNumberCode,
      password: data.password,
    };

    await auth.signIn(signInData);

    isLoading(false);
  };

  // const isPhoneNumberIncomplete = phoneNumber.length < 10;

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top']} style={styles.container}>
        <KeyboardAwareScrollView bottomOffset={220} style={styles.flex}>
          {/*Container*/}
          <View style={styles.container}>
            {/* Back Button */}
            <View style={styles.backButtonContainer}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}>
                <Image source={IMAGES.back} style={styles.backImage} />
              </TouchableOpacity>
            </View>
            {/* Title Container */}
            <View style={styles.titleContainer}>
              <Text style={styles.textTitle}>Welcome back!</Text>
              <Text style={styles.textSubtitle}>
                Login to Continue to Thundr! ⚡
              </Text>

              <View style={styles.numberContainer}>
                <View style={styles.numberCodeContainer}>
                  <Text style={styles.textNumberCode}>+63</Text>
                </View>
                <View style={styles.textInputContainer}>
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
                        ref={textInputRef}
                        style={styles.textInputNumber}
                        maxLength={10}
                        placeholder="XXX XXXX XXX"
                        inputMode={'numeric'}
                        autoComplete={'tel'}
                        onBlur={onBlur}
                        onChangeText={text => onChange(text)}
                        value={value}
                        selectionColor={COLORS.primary1}
                      />
                    )}
                    name="phoneNumber"
                  />
                  {errors.phoneNumber && <Text>This is required.</Text>}
                </View>
              </View>

              {/*Password Container*/}

              <View style={styles.passwordContainer}>
                <View style={styles.textInputPasswordContainer}>
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
                        ref={passwordRef}
                        style={styles.textInputPassword}
                        placeholder="Enter your password"
                        secureTextEntry={!showPassword}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        autoCapitalize="none"
                        selectionColor={COLORS.primary1}
                      />
                    )}
                    name="password"
                  />

                  {/* Show/hide icon */}
                  <TouchableOpacity
                    style={styles.showPasswordIcon}
                    onPress={() => setShowPassword(!showPassword)}>
                    <Image
                      source={showPassword ? IMAGES.eye : IMAGES.eyeHidden}
                      style={styles.showPasswordImage}
                    />
                  </TouchableOpacity>

                  {errors.password && (
                    <Text style={styles.errorText}>
                      {errors.password.message}
                    </Text>
                  )}
                </View>
              </View>
              <View style={styles.bodyContainer}>
                <Text style={styles.textBody}>Trouble signing in?</Text>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
        {/* sticky footer container*/}
        <KeyboardStickyView offset={{closed: -20, opened: 0}}>
          <View style={styles.buttonContainer}>
            <GradientButton
              onPress={handleSubmit(onSubmit)}
              text="Login"
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
    marginLeft: 16,
    flex: 1,
  },
  textInputPasswordContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
  },
  textInputNumber: {
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
  buttonContainer: {alignItems: 'center'},
  buttonStyle: {
    alignItems: 'center',
    maxWidth: width,
    width: width - 64,
    height: 50,
    justifyContent: 'center',
    borderRadius: 30,
    marginVertical: 10,
  },
  buttonTextStyle: {
    letterSpacing: -0.4,
    fontFamily: 'Montserrat-SemiBold',
    color: COLORS.white,
    fontSize: SIZES.h5,
  },
  passwordContainer: {
    marginTop: 10,
    marginBottom: 50,
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  textInputPassword: {
    backgroundColor: COLORS.white,
    fontSize: SIZES.h3,
    fontFamily: 'Montserrat-Medium',
    padding: 0,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.black,
  },
  showPasswordIcon: {
    position: 'absolute',
    right: 15,
  },
  showPasswordImage: {
    width: 22,
    height: 22,
  },
  errorText: {
    marginTop: 8,
    color: COLORS.primary1,
    fontFamily: 'Montserrat-Regular',
    letterSpacing: -0.8,
    fontSize: SIZES.h6,
  },
});

export default LoginValidation;
