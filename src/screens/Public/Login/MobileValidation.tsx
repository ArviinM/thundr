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

import GradientButton from '../../../components/shared/GradientButton.tsx';
import StepProgressBar from '../../../components/shared/StepProgressBar.tsx';

import {COLORS, SIZES, width} from '../../../constants/commons.ts';
import {IMAGES} from '../../../constants/images.ts';
import {RootNavigationParams} from '../../../constants/navigator.ts';
import {useMobileValidation} from '../../../hooks/registration/useMobileValidation.ts';
import {MobileValidationRequest} from '../../../types/generated.ts';
import {
  KeyboardAwareScrollView,
  KeyboardStickyView,
} from 'react-native-keyboard-controller';

const MobileValidation = () => {
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();
  const textInputRef = useRef<TextInput>(null);

  const [loading, isLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const mobileValidation = useMobileValidation();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      phoneNumber: '',
    },
  });

  useEffect(() => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  }, []);

  const onSubmit = async (data: {phoneNumber: string}) => {
    const withNumberCode = `+63${data.phoneNumber}`;
    isLoading(true);

    // Temporary Comment to Bypass
    const result = await mobileValidation.mutateAsync({
      phoneNumber: withNumberCode,
    } as MobileValidationRequest);

    navigation.navigate('MobileVerification', result);
    isLoading(false);
  };

  const isPhoneNumberIncomplete = phoneNumber.length < 10;

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top']} style={styles.container}>
        <StepProgressBar currentStep={1} totalSteps={6} />
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
              <Text style={styles.textTitle}>Hello, mars!</Text>
              <Text style={styles.textSubtitle}>Can we get your number?</Text>
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
                        onBlur={onBlur}
                        onChangeText={text => {
                          setPhoneNumber(text);
                          onChange(text);
                        }}
                        value={value}
                        selectionColor={COLORS.primary1}
                      />
                    )}
                    name="phoneNumber"
                  />
                  {errors.phoneNumber && <Text>This is required.</Text>}
                </View>
              </View>
              <View style={styles.bodyContainer}>
                <Text style={styles.textBody}>
                  Mag-text kami sa’yo sis to verify that you’re really you.
                  Paalala na huwag i-share ang iyong OTP.
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
              disabled={isPhoneNumberIncomplete}
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

export default MobileValidation;
