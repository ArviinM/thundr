// React modules
import React, {useState, useEffect} from 'react';

// Third party libraries
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

// Utils
import {navigationRef} from './tempNavigation';
import PublicScreenNavigation from './PublicScreenNavigation/PublicScreenNavigation';
import {useDispatch, useSelector} from 'react-redux';
import PrivateScreenNavigation from './PrivateScreenNavigation/PrivateScreenNavigation';
import Modal from '../composition/Modal/Modal';
import {GENERIC_ERROR} from '../utils/commons';

const RootNavigation = () => {
  const dispatch = useDispatch();
  const loginState = useSelector(state => state.login);
  const authenticated = loginState ? loginState.authenticated : false;
  const showModal = loginState ? loginState.showModal : false;
  const modalMessage = loginState ? loginState.modalMessage : '';
  const loginData = loginState ? loginState.loginData : null;

  const mobileEmailState = useSelector(state => state.mobileEmail) || {};
  const showEmailModal = mobileEmailState.showModal || false;
  const mobileEmailMessage = mobileEmailState.modalMessage || '';

  const ssoValidationState = useSelector(state => state.ssoValidation) || {};
  const showSSOModal = ssoValidationState.showModal || false;
  const ssoValidationMessage = ssoValidationState.modalMessage || '';

  const profileCreationState =
    useSelector(state => state.profileCreation) || {};
  const showProfileCreationModal = profileCreationState.showModal || false;
  const profileCreationModalMessage = profileCreationState.modalMessage || '';

  const [hideSplash, setHideSplash] = useState(false);

  const config = {
    screens: {LoginOptionScreen: 'sso/:payload'},
  };

  const linking = {
    prefixes: ['ph.thundr.app://'],
    config,
  };

  useEffect(() => {
    let delayHandle;
    if (hideSplash) {
      delayHandle = setTimeout(() => {
        SplashScreen.hide();
      }, 1000);
    }
    return () => {
      clearTimeout(delayHandle);
    };
  }, [hideSplash]);

  useEffect(() => {
    if (loginData?.loginDeactivated) {
    }
  }, [loginData, dispatch]);

  return (
    <NavigationContainer
      ref={navigationRef}
      linking={linking}
      onReady={() => {
        setHideSplash(true);
      }}
      theme={{colors: {background: '#f2cecd'}}}>
      <Modal
        modalMessage={
          modalMessage ||
          profileCreationModalMessage ||
          mobileEmailMessage ||
          ssoValidationMessage ||
          GENERIC_ERROR
        }
        showModal={
          showEmailModal ||
          showModal ||
          showSSOModal ||
          showProfileCreationModal
        }
      />
      {authenticated && !loginData?.loginDeactivated ? (
        <PrivateScreenNavigation />
      ) : (
        <PublicScreenNavigation />
      )}
    </NavigationContainer>
  );
};

export default RootNavigation;
