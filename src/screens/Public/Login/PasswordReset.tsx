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

import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';

import GradientButton from '../../../components/shared/GradientButton.tsx';

import {COLORS, SIZES, width} from '../../../constants/commons.ts';
import {IMAGES} from '../../../constants/images.ts';
import {RootNavigationParams} from '../../../constants/navigator.ts';

import {
  KeyboardAwareScrollView,
  KeyboardStickyView,
} from 'react-native-keyboard-controller';

import {scale} from '../../../utils/utils.ts';

type PasswordResetScreenRouteProp = RouteProp<
  RootNavigationParams,
  'PasswordReset'
>;

type PasswordResetProps = {
  route?: PasswordResetScreenRouteProp;
};
const PasswordReset = ({route}: PasswordResetProps) => {
  const {phoneNumber, code} = route?.params || {};
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();
  const [loading, isLoading] = useState(false);

  const onSubmit = async () => {
    try {
      isLoading(true);
      isLoading(false);
      if (phoneNumber && code) {
        navigation.navigate('PasswordNewValidation', {
          phoneNumber: phoneNumber,
          code: code,
        });
      }
    } catch (error) {
      console.error(error);
      isLoading(false);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
        <KeyboardAwareScrollView bottomOffset={220} style={styles.flex}>
          <View style={styles.container}>
            <View style={styles.backButtonContainer}>
              <TouchableOpacity disabled style={styles.backButton}>
                <Image
                  source={IMAGES.back}
                  style={[styles.backImage, {opacity: 0}]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.textTitle}>Password Reset</Text>
              <Text style={styles.textSubtitle}>
                Your password has been successfully reset. Click confirm to set
                a new password.
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                marginTop: scale(40),
                alignItems: 'flex-end',
              }}>
              <Image
                source={IMAGES.passwordReset}
                style={{width: scale(380), height: scale(400)}}
                resizeMode="contain"
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
        <KeyboardStickyView offset={{closed: -20, opened: 0}}>
          <View style={styles.buttonContainer}>
            <GradientButton
              onPress={onSubmit}
              text="Continue"
              loading={loading}
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

export default PasswordReset;
