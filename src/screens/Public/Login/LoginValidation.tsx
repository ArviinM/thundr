import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
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
import {COLORS, SIZES, width} from '../../../constants/commons.ts';
import {IMAGES} from '../../../constants/images.ts';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootNavigationParams} from '../../../constants/navigator.ts';
import GradientButton from '../../../components/shared/GradientButton.tsx';
import {useAuth} from '../../../providers/Auth.tsx';

const LoginValidation = () => {
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();
  const textInputRef = useRef<TextInput>(null);

  const auth = useAuth();
  const [loading, isLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  useEffect(() => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  }, []);

  const isPhoneNumberEmpty = phoneNumber.trim() === '';

  const signIn = async () => {
    isLoading(true);
    await auth.signIn();
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
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
              <Text style={styles.textTitle}>Welcome Back!</Text>
              <Text style={styles.textSubtitle}>
                Login to Continue to Thundr! ⚡️
              </Text>
              <View style={styles.numberContainer}>
                <View style={styles.numberCodeContainer}>
                  <Text style={styles.textNumberCode}>+63</Text>
                </View>
                <View style={styles.textInputContainer}>
                  <TextInput
                    ref={textInputRef}
                    style={styles.textInputNumber}
                    maxLength={10}
                    placeholder="XXX XXXX XXX"
                    inputMode={'numeric'}
                    autoComplete={'tel'}
                    onChangeText={text => setPhoneNumber(text)}
                  />
                </View>
              </View>
              <View style={{marginBottom: 20}}>
                <View style={styles.text2InputContainer}>
                  <TextInput
                    style={styles.textInputPassword}
                    placeholder="Password"
                    secureTextEntry
                    autoComplete={'password'}
                    // onChangeText={text => setPhoneNumber(text)}
                  />
                </View>
              </View>
              <View style={styles.bodyContainer}>
                <Text style={styles.textBody}>Trouble Signing In?</Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <GradientButton
                onPress={signIn}
                text="NEXT"
                loading={loading}
                disabled={isPhoneNumberEmpty}
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
    fontSize: SIZES.h1,
    fontFamily: 'Montserrat-Bold',
    letterSpacing: -0.6,
    color: COLORS.black,
  },
  textSubtitle: {
    fontSize: SIZES.h4,
    fontFamily: 'Montserrat-SemiBold',
    color: COLORS.gray,
    letterSpacing: -0.6,
  },
  numberContainer: {
    marginTop: 68,
    marginBottom: 20,
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
    fontSize: SIZES.h2,
    fontFamily: 'Montserrat-Medium',
  },
  textInputContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.black,
    flex: 1,
  },
  text2InputContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  textInputNumber: {
    backgroundColor: COLORS.white,
    fontSize: SIZES.h2,
    fontFamily: 'Montserrat-Medium',
    padding: 0,
    width: '100%',
  },
  textInputPassword: {
    backgroundColor: COLORS.white,
    fontSize: SIZES.h2,
    fontFamily: 'Montserrat-Medium',
    padding: 0,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.black,
  },
  bodyContainer: {marginRight: 30},
  textBody: {
    fontSize: SIZES.h4,
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
    fontSize: SIZES.h3,
  },
});

export default LoginValidation;
