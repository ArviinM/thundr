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
import {API_BASE_URL, BUILD_NUMBER} from '@env';

// Components
import Separator from '../../../components/Separator/Separator';
import Image from '../../../components/Image/Image';
import Text from '../../../components/Text/Text';

// Utils
import {LOGIN_ASSET_URI} from '../../../utils/images';
import {
  isAndroidDevice,
  isIosDevice,
  scale,
  verticalScale,
} from '../../../utils/commons';
import {useDispatch, useSelector} from 'react-redux';
import {UPDATE_LOGIN_STATE} from '../../../ducks/Login/actionTypes';
import {UPDATE_SSO_VALIDATION_STATE} from '../../../ducks/SSOValidation/actionTypes';

const LoginOptionScreen = () => {
  const dispatch = useDispatch();
  const {refreshToken} = useSelector(state => state.persistedState);
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
      const forProfileCreation = responseObject?.forProfileCreation;

      if (forProfileCreation) {
        navigation.navigate('MobileAndEmailVerificationStack');
        dispatch({
          type: UPDATE_SSO_VALIDATION_STATE,
          newState: {ssoValidationData: responseObject, loginViaSSO: true},
        });
        dispatch({
          type: UPDATE_LOGIN_STATE,
          newState: {
            loginData: responseObject,
            token: responseObject.accessToken,
          },
        });
      } else {
        dispatch({
          type: UPDATE_LOGIN_STATE,
          newState: {authenticated: true, loginData: responseObject},
        });
      }
    }
  }, [params]);

  const renderButton = (isSSO, link, icon, text) => {
    return (
      <TouchableOpacity
        onPress={() =>
          isSSO
            ? Linking.openURL(link)
            : refreshToken
            ? navigation.navigate('LoginScreen')
            : navigation.navigate('MobileAndEmailVerificationStack')
        }>
        <View
          style={{
            backgroundColor: '#fff',
            height: 'auto',
            width: scale(isIosDevice() ? 260 : 280),
            justifyContent: 'center',
            borderRadius: 20,
            flexDirection: 'row',
          }}>
          <Image
            source={icon}
            height={30}
            width={25}
            customStyle={{marginRight: scale(isIosDevice() ? 3 : 2)}}
          />
          <Text
            color="#E33051"
            weight={700}
            customStyle={{
              textAlign: 'center',
              top: verticalScale(isIosDevice() ? 8 : 4),
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
      <View style={{alignItems: 'center', top: verticalScale(10)}}>
        {isAndroidDevice() && (
          <>
            {renderButton(
              true,
              `${API_BASE_URL}auth/get-sso-url?sso=${
                isIosDevice() ? 'SignInWithApple' : 'Google'
              }`,
              isIosDevice()
                ? LOGIN_ASSET_URI.APPLE_ICON
                : LOGIN_ASSET_URI.GOOGLE_ICON,
              `Continue with ${isIosDevice() ? 'Apple' : 'Google'}`,
            )}
            <Separator space={5} />
          </>
        )}
        {isAndroidDevice() && (
          <>
            {renderButton(
              true,
              `${API_BASE_URL}auth/get-sso-url?sso=Facebook`,
              LOGIN_ASSET_URI.FACEBOOK_ICON,
              'Continue with Facebook',
            )}
          </>
        )}
        <Separator space={isIosDevice() ? 25 : 5} />
        {renderButton(
          false,
          '',
          LOGIN_ASSET_URI.MOBILE_ICON,
          'Continue with Mobile Number',
        )}
        <Separator space={20} />
        <View
          style={{
            paddingHorizontal: scale(50),
            top: verticalScale(70),
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
          <Separator space={20} />
          <Text
            size={11}
            customStyle={{textAlign: 'center'}}>{`BUILD ${BUILD_NUMBER}`}</Text>
        </View>
      </View>
    </View>
  );
};

export default LoginOptionScreen;
