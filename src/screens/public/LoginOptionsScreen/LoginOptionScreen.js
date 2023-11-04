// React modules
import React, {useCallback} from 'react';
import {BackHandler, Linking, TouchableOpacity, View} from 'react-native';

// Third party libraries
import {useFocusEffect, useNavigation} from '@react-navigation/native';

// Components
import Separator from '../../../components/Separator/Separator';
import Image from '../../../components/Image/Image';
import Text from '../../../components/Text/Text';

// Utils
import {LOGIN_ASSET_URI} from '../../../utils/images';
import {isIosDevice, scale, verticalScale} from '../../../utils/commons';

const LoginOptionScreen = () => {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => {
        backHandler.remove();
      };
    }, []),
  );

  return (
    <View
      style={{
        flex: 1,
        alignContent: 'center',
        backgroundColor: '#F2CECD',
      }}>
      <Separator space={100} />
      <Image source={LOGIN_ASSET_URI.THUNDR_LOGO} height={210} width={350} />
      <Separator space={30} />
      <Text
        color="#59595B"
        weight={700}
        size={14}
        customStyle={{textAlign: 'center'}}>
        Register here
      </Text>
      <View style={{alignItems: 'center', top: verticalScale(10)}}>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              `https://dev-api.thundr.ph/auth/get-sso-url?sso=${
                isIosDevice() ? 'Apple' : 'Google'
              }`,
            )
          }>
          <View
            style={{
              backgroundColor: '#fff',
              height: verticalScale(33),
              width: scale(230),
              justifyContent: 'center',
              borderRadius: 20,
              flexDirection: 'row',
            }}>
            <Image
              source={
                isIosDevice()
                  ? LOGIN_ASSET_URI.APPLE_ICON
                  : LOGIN_ASSET_URI.GOOGLE_ICON
              }
              height={30}
              width={20}
              customStyle={{marginRight: scale(6)}}
            />
            <Text
              color="#E33051"
              weight={700}
              customStyle={{
                textAlign: 'center',
                top: verticalScale(isIosDevice() ? 8 : 4),
              }}>
              Continue with {isIosDevice() ? 'Apple' : 'Google'}
            </Text>
          </View>
        </TouchableOpacity>
        <Separator space={5} />
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              'https://dev-api.thundr.ph/auth/get-sso-url?sso=Facebook',
            )
          }>
          <View
            style={{
              backgroundColor: '#fff',
              height: verticalScale(33),
              width: scale(230),
              justifyContent: 'center',
              borderRadius: 20,
              flexDirection: 'row',
            }}>
            <Image
              source={LOGIN_ASSET_URI.FACEBOOK_ICON}
              height={30}
              width={20}
              customStyle={{marginRight: scale(6)}}
            />
            <Text
              color="#E33051"
              weight={700}
              customStyle={{
                textAlign: 'center',
                top: verticalScale(isIosDevice() ? 8 : 4),
              }}>
              Continue with Facebook
            </Text>
          </View>
        </TouchableOpacity>
        <Separator space={5} />
        <TouchableOpacity
          onPress={() => navigation.navigate('MobileValidationScreen')}>
          <View
            style={{
              backgroundColor: '#fff',
              height: verticalScale(33),
              width: scale(230),
              justifyContent: 'center',
              borderRadius: 20,
              flexDirection: 'row',
            }}>
            <Image
              source={LOGIN_ASSET_URI.MOBILE_ICON}
              height={30}
              width={20}
              customStyle={{marginRight: scale(6)}}
            />
            <Text
              color="#E33051"
              weight={700}
              customStyle={{
                textAlign: 'center',
                top: verticalScale(isIosDevice() ? 8 : 4),
              }}>
              Continue with Mobile Number
            </Text>
          </View>
        </TouchableOpacity>
        <Separator space={20} />
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <View
            style={{
              backgroundColor: '#fff',
              height: verticalScale(30),
              width: scale(80),
              justifyContent: 'center',
              borderRadius: 20,
            }}>
            <Text
              color="#E33051"
              weight={700}
              customStyle={{textAlign: 'center'}}>
              LOGIN
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            paddingHorizontal: scale(50),
            top: verticalScale(60),
          }}>
          <Text
            size={11}
            color="#59595B"
            customStyle={{
              textAlign: 'center',
            }}>
            By signing up, I declare that I'm 35 years of age or older and
            hereby agree to the{' '}
            <Text
              color="#59595B"
              size={11}
              customStyle={{textDecorationLine: 'underline'}}>
              Terms and Conditions
            </Text>{' '}
            of Thundr and its{' '}
            <Text
              color="#59595B"
              size={11}
              customStyle={{textDecorationLine: 'underline'}}>
              Privacy Policy.
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LoginOptionScreen;
