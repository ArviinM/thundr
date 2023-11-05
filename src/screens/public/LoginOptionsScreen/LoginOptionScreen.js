// React modules
import React, {useCallback, useEffect} from 'react';
import {BackHandler, Linking, TouchableOpacity, View} from 'react-native';

// Third party libraries
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import base64 from 'react-native-base64';

// Components
import Separator from '../../../components/Separator/Separator';
import Image from '../../../components/Image/Image';
import Text from '../../../components/Text/Text';

// Utils
import {LOGIN_ASSET_URI} from '../../../utils/images';
import {isIosDevice, scale, verticalScale} from '../../../utils/commons';
import {useDispatch} from 'react-redux';
import {UPDATE_LOGIN_STATE} from '../../../ducks/Login/actionTypes';
import {UPDATE_SSO_VALIDATION_STATE} from '../../../ducks/SSOValidation/actionTypes';

const LoginOptionScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute();
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

  const {params} = route;

  useEffect(() => {
    if (params?.payload) {
      const responseObject = JSON.parse(base64.decode(params.payload));
      const forMobileValidation = true;

      if (forMobileValidation) {
        navigation.navigate('MobileAndEmailVerificationStack');
        dispatch({
          type: UPDATE_SSO_VALIDATION_STATE,
          newState: {ssoValidationData: responseObject, loginViaSSO: true},
        });
        dispatch({
          type: UPDATE_LOGIN_STATE,
          newState: {loginData: responseObject},
        });
      } else {
        dispatch({
          type: UPDATE_LOGIN_STATE,
          newState: {authenticated: true, loginData: responseObject},
        });
      }

      // Temporary comment basta ibabalik to
      // if (responseObject) {
      //   dispatch({
      //     type: UPDATE_LOGIN_STATE,
      //     newState: {authenticated: true, loginData: responseObject},
      //   });
      // }
    }
  }, [params]);

  const renderButton = (isSSO, link, icon, text) => {
    return (
      <TouchableOpacity
        onPress={() =>
          isSSO
            ? Linking.openURL(link)
            : navigation.navigate('MobileAndEmailVerificationStack')
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
            source={icon}
            height={30}
            width={20}
            customStyle={{marginRight: scale(6)}}
          />
          <Text
            color="#E33051"
            weight={700}
            customStyle={{
              textAlign: 'center',
              top: verticalScale(isIosDevice() ? 8 : 6),
            }}>
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

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
        {renderButton(
          true,
          `https://dev-api.thundr.ph/auth/get-sso-url?sso=${
            isIosDevice() ? 'Apple' : 'Google'
          }`,
          isIosDevice()
            ? LOGIN_ASSET_URI.APPLE_ICON
            : LOGIN_ASSET_URI.GOOGLE_ICON,
          `Continue with ${isIosDevice() ? 'Apple' : 'Google'}`,
        )}
        <Separator space={5} />
        {renderButton(
          true,
          'https://dev-api.thundr.ph/auth/get-sso-url?sso=Facebook',
          LOGIN_ASSET_URI.FACEBOOK_ICON,
          'Continue with Facebook',
        )}
        <Separator space={5} />
        {renderButton(
          false,
          '',
          LOGIN_ASSET_URI.MOBILE_ICON,
          'Continue with Mobile Number',
        )}
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
