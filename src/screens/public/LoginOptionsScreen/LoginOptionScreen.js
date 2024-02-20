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
import DeactivateAccountModal from '../../../composition/DeactivateAccountModal/DeactivateAccountModal';

const LoginOptionScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();
  const [displayDeactivateModal, setDisplayDeactivateModal] = useState(false);
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

  const renderButton = (isSSO, link, icon, text, lastLogin) => {
    const handleClick = () => {
      if (isSSO) {
        Linking.openURL(link);
        dispatch({
          type: UPDATE_PERSISTED_STATE,
          newState: {lastLogin: lastLogin},
        });
      } else if (refreshToken) {
        navigation.navigate('LoginScreen');
      } else if (!privacyPolicyChecked) {
        setDisplayModal(true);
      } else {
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
      <FeatureNotAvailableModal
        displayModal={displayModal}
        setDisplayModal={setDisplayModal}
        normalBehaviorModal={true}
        message="Gora na ba, sis? 
        Read the Terms and Conditions pati ang Privacy Policy muna sa baba sis."
      />
      <DeactivateAccountModal
        fromLogin={true}
        displayDeactivateModal={displayDeactivateModal}
        setDisplayDeactivateModal={setDisplayDeactivateModal}
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
        )}
        <Separator space={20} />
        {lastLogin && (
          <Text
            size={11}
            color="#59595B"
            customStyle={{
              textAlign: 'center',
            }}>{`Your last sign-in was via ${lastLogin}`}</Text>
        )}
        <View
          style={{
            paddingHorizontal: scale(50),
            top: verticalScale(70),
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <CheckBox
              isChecked={privacyPolicyChecked}
              disabled={true}
              checkBoxColor="#fff"
              uncheckedCheckBoxColor="#fff"
            />
            <Text
              size={12}
              color="#59595B"
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
                  size={12}
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
            customStyle={{textAlign: 'center'}}>{`BUILD ${BUILD_NUMBER}`}</Text>
        </View>
      </View>
    </View>
  );
};

export default LoginOptionScreen;
