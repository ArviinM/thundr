import React, {useEffect, useState} from 'react';
import {
  Image,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {API_BASE_URL} from '@env';
import {atob} from 'react-native-quick-base64';

import Button from '../../../components/shared/Button.tsx';

import {RootNavigationParams} from '../../../constants/navigator.ts';
import {IMAGES} from '../../../constants/images.ts';
import {COLORS, height, SIZES, width} from '../../../constants/commons.ts';
import {Google} from '../../../assets/images/socials/Google.tsx';
import {Facebook} from '../../../assets/images/socials/Facebook.tsx';
import {PhoneIcon} from '../../../assets/images/socials/Phone.tsx';
import {profileCreationStyles} from '../../Private/ProfileCreation/styles.tsx';
import {AuthDataResponse} from '../../../types/generated.ts';
import {useAuth} from '../../../providers/Auth.tsx';

type LoginScreenRouteProp = RouteProp<RootNavigationParams, 'Login'>;

type LoginProps = {
  route?: LoginScreenRouteProp;
};

const Login = ({route}: LoginProps) => {
  const {payload} = route?.params || {};
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();

  const [showSocialButtons, setShowSocialButtons] = useState(false);
  const auth = useAuth();

  const handleTermsPress = (isTerms: boolean) => {
    if (isTerms) {
      navigation.navigate('Terms', {
        uri: 'https://thundr.ph/terms-and-condition/',
      });
    } else {
      navigation.navigate('Terms', {uri: 'https://thundr.ph/privacy-policy/'});
    }
  };

  useEffect(() => {
    if (payload) {
      const responseObject: AuthDataResponse = JSON.parse(atob(payload));
      auth.signInSSO(responseObject);
    }
  }, [auth, payload]);

  return (
    <LinearGradient
      colors={['#E33051', '#EF9D47']}
      style={styles.flexContainer}
      start={{x: 0.3, y: 0.3}}
      end={{x: 0.1, y: 0.9}}>
      <SafeAreaView style={[styles.flexContainer]} edges={['bottom', 'top']}>
        {showSocialButtons && (
          <View style={[{flex: 0.1, marginTop: 32, marginLeft: 14}]}>
            <TouchableOpacity
              onPress={() => setShowSocialButtons(false)}
              style={profileCreationStyles.backButton}>
              <Image
                source={IMAGES.back}
                style={[
                  profileCreationStyles.backImage,
                  {tintColor: COLORS.white},
                ]}
              />
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={IMAGES.thundrLogo}
              style={{
                alignSelf: 'center',
              }}
              resizeMode={'contain'}
            />
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

            {!showSocialButtons && (
              <View>
                <Button
                  onPress={() => navigation.navigate('MobileValidation')}
                  text="Create Account"
                  buttonStyle={styles.button1}
                  textStyle={styles.text1}
                />
                <Button
                  onPress={() => {
                    if (Platform.OS === 'ios') {
                      navigation.navigate('LoginValidation');
                    }

                    if (Platform.OS === 'android') {
                      setShowSocialButtons(true);
                    }
                  }}
                  text="Sign In"
                  buttonStyle={styles.button2}
                  textStyle={styles.text2}
                />
              </View>
            )}

            {showSocialButtons && (
              <View>
                {/* Add styling as needed */}
                <Button
                  text="Continue in with Google"
                  buttonStyle={styles.button1}
                  textStyle={styles.text1}
                  onPress={async () => {
                    await Linking.openURL(
                      // 'https://prod-api.thundr.ph/auth/get-sso-url?sso=Google',
                      `${API_BASE_URL}/auth/get-sso-url?sso=Google`,
                    );
                  }}
                  isSSO
                  logo={<Google />}
                />
                <Button
                  text="Continue in with Facebook"
                  buttonStyle={styles.button1}
                  textStyle={styles.text1}
                  onPress={async () => {
                    await Linking.openURL(
                      `${API_BASE_URL}/auth/get-sso-url?sso=Facebook`,
                    );
                  }}
                  isSSO
                  logo={<Facebook />}
                />
                <Button
                  text="Continue in with Phone Number"
                  buttonStyle={[styles.button1, {marginBottom: 0}]}
                  textStyle={styles.text1}
                  onPress={() => navigation.navigate('LoginValidation')}
                  isSSO
                  logo={<PhoneIcon />}
                />
              </View>
            )}
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgetPasswordValidation')}>
              <Text style={styles.text3}>Trouble signing in?</Text>
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
    transform: [{scale: 0.8}],
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
    fontSize: SIZES.h6,
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
    fontSize: SIZES.h5,
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
    fontSize: SIZES.h5,
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
