// React modules
import React, {useState, useEffect} from 'react';

// Third party libraries
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

// Utils
import {navigationRef} from './tempNavigation';
import PublicScreenNavigation from './PublicScreenNavigation/PublicScreenNavigation';
import Spinner from '../components/Spinner/Spinner';
import {useSelector} from 'react-redux';
import PrivateScreenNavigation from './PrivateScreenNavigation/PrivateScreenNavigation';
import Modal from '../composition/Modal/Modal';
import {GENERIC_ERROR} from '../utils/commons';

const RootNavigation = () => {
  const {authenticated, showModal} = useSelector(state => state.login);
  const {showModal: showEmailModal} = useSelector(state => state.mobileEmail);
  const {showModal: showSSOModal} = useSelector(state => state.ssoValidation);
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

  return (
    <NavigationContainer
      ref={navigationRef}
      linking={linking}
      onReady={() => {
        setHideSplash(true);
      }}
      theme={{colors: {background: '#f2cecd'}}}>
      <Modal
        modalMessage={GENERIC_ERROR}
        showModal={showEmailModal || showModal || showSSOModal}
      />
      {authenticated ? <PrivateScreenNavigation /> : <PublicScreenNavigation />}
    </NavigationContainer>
  );
};

export default RootNavigation;
