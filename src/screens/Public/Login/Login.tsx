import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Button from '../../../components/shared/Button.tsx';
import {useAuth} from '../../../providers/Auth.tsx';

import {RootNavigationParams} from '../../../constants/navigator.ts';
import {IMAGES} from '../../../constants/images.ts';
import {COLORS, height, SIZES, width} from '../../../constants/commons.ts';

const Login = () => {
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();
  const [loading, isLoading] = useState(false);
  const auth = useAuth();
  // TODO: For configuration of auth service
  const signIn = async () => {
    isLoading(true);
    await auth.signIn();
  };

  const handleTermsPress = (isTerms: boolean) => {
    if (isTerms) {
      navigation.navigate('Terms', {
        uri: 'https://thundr.ph/terms-and-condition/',
      });
    } else {
      navigation.navigate('Terms', {uri: 'https://thundr.ph/privacy-policy/'});
    }
  };

  return (
    <LinearGradient
      colors={['#E33051', '#EF9D47']}
      style={styles.flexContainer}
      start={{x: 0.3, y: 0.3}}
      end={{x: 0.1, y: 0.9}}>
      <SafeAreaView style={[styles.flexContainer]} edges={['bottom', 'top']}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={IMAGES.thundrLogo} style={{alignSelf: 'center'}} />
          </View>
          <View style={styles.bottomContainer}>
            <Text style={styles.termsText}>
              By tapping ‘Sign in’ you agree to our{' '}
              <Text
                style={styles.termsLink}
                onPress={() => handleTermsPress(true)}>
                Terms & Conditions
              </Text>
              . Learn how we process your data in our{' '}
              <Text
                style={styles.termsLink}
                onPress={() => handleTermsPress(false)}>
                Privacy Policy
              </Text>
              .
            </Text>
            <Button
              onPress={() => navigation.navigate('MobileValidation')}
              text="CREATE ACCOUNT"
              buttonStyle={styles.button1}
              textStyle={styles.text1}
            />
            <Button
              onPress={() => navigation.navigate('LoginValidation')}
              text="SIGN IN"
              loading={loading}
              buttonStyle={styles.button2}
              textStyle={styles.text2}
            />
            <TouchableOpacity onPress={() => console.log('Trouble Signing In')}>
              <Text style={styles.text3}>Trouble Signing In?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  flexContainer: {flex: 1},
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height / 8,
  },
  bottomContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  termsText: {
    marginHorizontal: 35,
    marginBottom: 28,
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    color: COLORS.white,
    fontSize: 12,
    letterSpacing: -0.4,
  },
  termsLink: {
    textDecorationLine: 'underline',
  },
  button1: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    maxWidth: width,
    width: width - 64,
    height: 50,
    justifyContent: 'center',
    borderRadius: 30,
    marginBottom: 12,
  },
  text1: {
    letterSpacing: -0.4,
    fontFamily: 'Montserrat-SemiBold',
    color: COLORS.black,
    fontSize: SIZES.h3,
  },
  button2: {
    alignItems: 'center',
    maxWidth: width,
    width: width - 64,
    height: 50,
    justifyContent: 'center',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  text2: {
    letterSpacing: -0.4,
    fontFamily: 'Montserrat-Bold',
    color: COLORS.white,
    fontSize: SIZES.h3,
  },
  text3: {
    marginVertical: 16,
    marginTop: 20,
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    color: COLORS.white,
    fontSize: 12,
    letterSpacing: -0.4,
  },
});

export default Login;
