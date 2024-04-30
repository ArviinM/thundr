import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {Reference} from 'yup';

import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';

import GradientButton from '../../../components/shared/GradientButton.tsx';

import {COLORS, SIZES, width} from '../../../constants/commons.ts';
import {IMAGES} from '../../../constants/images.ts';
import {RootNavigationParams} from '../../../constants/navigator.ts';

import {yupResolver} from '@hookform/resolvers/yup';
import {
  KeyboardAwareScrollView,
  KeyboardStickyView,
} from 'react-native-keyboard-controller';

import {useForgetPasswordChangePassword} from '../../../hooks/forget-password/useForgetPasswordChangePassword.ts';
import {useChangePassword} from '../../../hooks/forget-password/useChangePassword.ts';

type PasswordNewValidationScreenRouteProp = RouteProp<
  RootNavigationParams,
  'PasswordNewValidation'
>;

type PasswordNewValidationProps = {
  route?: PasswordNewValidationScreenRouteProp;
};

const PasswordNewValidation = ({route}: PasswordNewValidationProps) => {
  const {phoneNumber, code, isAuthenticated} = route?.params || {};

  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();
  const [showPassword, setShowPassword] = useState(false);
  const passwordRef = useRef<TextInput>(null); // Ref for password input
  const confirmPasswordRef = useRef<TextInput>(null); // Ref for password input
  const oldPasswordRef = useRef<TextInput>(null); // Ref for password input

  const [loading, isLoading] = useState(false);
  const passwordChange = useForgetPasswordChangePassword();
  const passwordChangeOld = useChangePassword();

  const schema = yup.object().shape({
    oldPassword: yup.string(),
    password: yup
      .string()
      .required('Nako mars, we need your password!')
      .min(8, 'Password must be at least 8 characters.')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
        'Must contain one uppercase, lowercase, number, and special character.',
      ),
    confirmPassword: yup
      .string()
      .required('Please confirm your password.')
      .oneOf(
        [yup.ref('password') as Reference<string>, ''],
        'Passwords must match.',
      ),
  });

  const schemaAuthenticated = yup.object().shape({
    oldPassword: yup
      .string()
      .required('Mars, we need your old password, paano namin papalitan yan?'),
    password: yup
      .string()
      .required('Nako mars, we need your password!')
      .min(8, 'Password must be at least 8 characters.')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
        'Must contain one uppercase, lowercase, number, and special character.',
      ),
    confirmPassword: yup
      .string()
      .required('Please confirm your password.')
      .oneOf(
        [yup.ref('password') as Reference<string>, ''],
        'Passwords must match.',
      ),
  });

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    resolver: yupResolver(isAuthenticated ? schemaAuthenticated : schema),
  });

  useEffect(() => {
    if (passwordRef.current) {
      passwordRef.current.focus();
    }
  }, []);

  const onSubmit = async (data: {
    password: string;
    confirmPassword: string;
    oldPassword?: string;
  }) => {
    try {
      if (!isAuthenticated) {
        await schema.validate(data);
        isLoading(true);

        if (phoneNumber && code) {
          const result = await passwordChange.mutateAsync({
            phoneNumber: phoneNumber,
            code: code,
            newPassword: data.confirmPassword,
          });
          if (result.done) {
            navigation.navigate('PasswordResetConfirmed', {
              isAuthenticated: false,
            });
          }
        }

        isLoading(false);
      }

      if (isAuthenticated) {
        await schemaAuthenticated.validate(data);
        isLoading(true);

        if (data.oldPassword) {
          await passwordChangeOld.mutateAsync({
            oldPassword: data.oldPassword,
            newPassword: data.confirmPassword,
          });

          navigation.navigate('PasswordResetConfirmed', {
            isAuthenticated: true,
          });
        }

        isLoading(false);
      }
    } catch (error) {
      console.error(error);
      isLoading(false);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
        <KeyboardAwareScrollView bottomOffset={50}>
          <View style={styles.container}>
            <View style={styles.backButtonContainer}>
              <TouchableOpacity
                disabled={!isAuthenticated}
                style={styles.backButton}
                onPress={() => navigation.navigate('Settings')}>
                <Image
                  source={IMAGES.back}
                  style={[
                    styles.backImage,
                    isAuthenticated ? {opacity: 1} : {opacity: 0},
                  ]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.textTitle}>
                {isAuthenticated ? 'Set a new password' : 'Set a new password'}
              </Text>
              <Text
                style={[
                  isAuthenticated
                    ? [styles.textSubtitle, {color: COLORS.gray}]
                    : styles.textSubtitle,
                ]}>
                {isAuthenticated
                  ? 'Please provide your old password and your new password for verification purposes.'
                  : 'Create a new password. Ensure it differs from the previous ones for security'}
              </Text>

              {/*Old Password */}
              <View style={styles.passwordContainer}>
                <View style={styles.textInputContainer}>
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
                        ref={oldPasswordRef} // Assign the ref
                        style={styles.textInputPassword}
                        placeholder="Enter your old password"
                        secureTextEntry={!showPassword} // Control visibility
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        maxLength={16}
                        autoCapitalize="none"
                        selectionColor={COLORS.primary1}
                        placeholderTextColor={COLORS.gray}
                      />
                    )}
                    name="oldPassword"
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
              {/* Password Input Section */}
              <View style={styles.passwordContainer2}>
                <View style={styles.textInputContainer}>
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
                        ref={passwordRef} // Assign the ref
                        style={styles.textInputPassword}
                        placeholder="Enter your new password"
                        secureTextEntry={!showPassword} // Control visibility
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        maxLength={16}
                        autoCapitalize="none"
                        selectionColor={COLORS.primary1}
                        placeholderTextColor={COLORS.gray}
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

              {/* Confirm Password Input */}
              <View style={styles.passwordContainer2}>
                <View style={styles.textInputContainer}>
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
                        ref={confirmPasswordRef}
                        style={styles.textInputPassword}
                        placeholder="Confirm your new password"
                        secureTextEntry={!showPassword}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        autoCapitalize="none"
                        selectionColor={COLORS.primary1}
                        placeholderTextColor={COLORS.gray}
                      />
                    )}
                    name="confirmPassword"
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

                  {errors.confirmPassword && (
                    <Text style={styles.errorText}>
                      {errors.confirmPassword.message}
                    </Text>
                  )}
                </View>
              </View>

              <View style={styles.bodyContainer}>
                <Text style={styles.textBody}>
                  Never share your password, mars!
                </Text>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>

        {/* Footer Container */}
        <KeyboardStickyView offset={{closed: 0, opened: 30}}>
          <View style={styles.buttonContainer}>
            <GradientButton
              onPress={handleSubmit(onSubmit)}
              text="Update Password"
              loading={loading}
              disabled={!isValid}
              buttonStyle={styles.buttonStyle}
              textStyle={styles.buttonTextStyle}
            />
          </View>
        </KeyboardStickyView>
        {/*</KeyboardAvoidingView>*/}
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
  passwordContainer: {
    marginTop: 100,
    marginBottom: 30,
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  passwordContainer2: {
    marginTop: 10,
    marginBottom: 30,
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  textInputContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
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
  showPasswordIcon: {
    position: 'absolute',
    right: 15,
  },
  showPasswordImage: {
    width: 22,
    height: 22,
  },
});

export default PasswordNewValidation;
