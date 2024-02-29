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
import {START_LOGOUT} from '../ducks/Login/actionTypes';

const RootNavigation = () => {
  const dispatch = useDispatch();
  const {authenticated, showModal, modalMessage, loginData} = useSelector(
    state => state.login,
  );
  const {showModal: showEmailModal, modalMessage: mobileEmailMessage} =
    useSelector(state => state.mobileEmail);
  const {showModal: showSSOModal, modalMessage: ssoValidationMessage} =
    useSelector(state => state.ssoValidation);
  const {
    showModal: showProfileCreationModal,
    modalMessage: profileCreationModalMessage,
  } = useSelector(state => state.profileCreation);
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
