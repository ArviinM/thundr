// React modules
import React, {useCallback, useEffect, useState} from 'react';
import {BackHandler, Linking, TouchableOpacity, View} from 'react-native';

// Third party libraries
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import base64 from 'react-native-base64';
import {useDispatch, useSelector} from 'react-redux';
import CheckBox from 'react-native-check-box';

// Components
import Separator from '../../../components/Separator/Separator';
import Image from '../../../components/Image/Image';
import Text from '../../../components/Text/Text';
import FeatureNotAvailableModal from '../../../composition/FeatureNotAvailableModal/FeatureNotAvailableModal';

// Ducks
import {UPDATE_PERSISTED_STATE} from '../../../ducks/PersistedState/actionTypes';
import {UPDATE_LOGIN_STATE} from '../../../ducks/Login/actionTypes';
import {UPDATE_SSO_VALIDATION_STATE} from '../../../ducks/SSOValidation/actionTypes';

// Utils
import {API_BASE_URL, BUILD_NUMBER} from '@env';
import {LOGIN_ASSET_URI} from '../../../utils/images';
import {
  isAndroidDevice,
  isIosDevice,
  scale,
  verticalScale,
} from '../../../utils/commons';

const LoginOptionScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();
  const {refreshToken, lastLogin, privacyPolicyChecked} = useSelector(
    state => state.persistedState,
  );

  const [displayModal, setDisplayModal] = useState(false);

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

  const renderButton = (
    isSSO,
    link,
    icon,
    text,
    lastLogin,
    privacyPolicyChecked,
  ) => {
    const handleClick = () => {
      //Changed conditional handling of privacy policy
      if (!privacyPolicyChecked) {
        setDisplayModal(true);
      }
      if (isSSO && privacyPolicyChecked) {
        Linking.openURL(link);
        dispatch({
          type: UPDATE_PERSISTED_STATE,
          newState: {lastLogin: lastLogin},
        });
      }
      if (refreshToken && privacyPolicyChecked && !isSSO) {
        navigation.navigate('LoginScreen');
      }
      if (!isSSO && refreshToken && privacyPolicyChecked) {
        dispatch({
          type: UPDATE_PERSISTED_STATE,
          newState: {lastLogin: lastLogin},
        });
        navigation.navigate('MobileAndEmailVerificationStack');
      }
    };
    return (
      <TouchableOpacity onPress={handleClick}>
        <View
          style={{
            backgroundColor: '#fff',
            height: 'auto',
            width: scale(260),
            flexDirection: 'row',
            justifyContent: 'center', // Center items horizontally
            alignItems: 'center', // Center items vertically
            borderRadius: 20,
            paddingVertical: verticalScale(3),
          }}>
          <View style={{justifyContent: 'center'}}>
            <Image
              source={icon}
              height={30}
              width={25}
              customStyle={{marginRight: scale(isIosDevice() ? 3 : 2)}}
            />
          </View>
          <Text
            color="#E33051"
            weight={700}
            size={scale(11)}
            fontFamily="Montserrat-Regular"
            style={{
              flex: 1,
              textAlign: 'right',
              // top: verticalScale(isIosDevice() ? 8 : 4),
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
      <View style={{flex: 1}}>
        <Separator space={100} />
        <Image source={LOGIN_ASSET_URI.THUNDR_LOGO} height={210} width={350} />
        <FeatureNotAvailableModal
          displayModal={displayModal}
          setDisplayModal={setDisplayModal}
          normalBehaviorModal={true}
          message="Gora na ba, sis?
        Read the Terms and Conditions pati ang Privacy Policy muna sa baba sis."
        />
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
                isIosDevice() ? 'Apple' : 'Google',
                privacyPolicyChecked,
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
                'Facebook',
                privacyPolicyChecked,
              )}
            </>
          )}
          <Separator space={isIosDevice() ? 25 : 5} />
          {renderButton(
            false,
            '',
            LOGIN_ASSET_URI.MOBILE_ICON,
            'Continue with Mobile Number',
            'Mobile Number',
            privacyPolicyChecked,
          )}
          <Separator space={20} />
          {lastLogin && (
            <Text
              size={11}
              color="#59595B"
              fontFamily="Montserrat-Regular"
              customStyle={{
                textAlign: 'center',
              }}>{`Your last sign-in was via ${lastLogin}`}</Text>
          )}
        </View>
      </View>
      <View
        style={{
          padding: scale(30),
          bottom: scale(10),
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <CheckBox
            isChecked={privacyPolicyChecked}
            disabled={true}
            checkBoxColor="#fff"
            uncheckedCheckBoxColor="#fff"
          />
          <Text
            size={scale(10)}
            color="#59595B"
            fontFamily="Montserrat-Regular"
            customStyle={{
              textAlign: 'center',
            }}>
            By signing up, I am 35 years of age or older and agrees to the{' '}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('SecurityAndPrivacy', {
                  fromLogin: true,
                })
              }>
              <Text
                color="#59595B"
                size={scale(10)}
                fontFamily="Montserrat-Regular"
                customStyle={{
                  textDecorationLine: 'underline',
                  textAlign: 'center',
                }}>
                Terms and Conditions and its Privacy Policy
              </Text>
            </TouchableOpacity>
            {'\n'}of Thundr.
          </Text>
        </View>
        <Separator space={20} />
        <Text
          size={11}
          fontFamily="Montserrat-Regular"
          customStyle={{textAlign: 'center'}}>{`BUILD ${BUILD_NUMBER}`}</Text>
      </View>
    </View>
  );
};

export default LoginOptionScreen;
