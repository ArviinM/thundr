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

const RootNavigation = () => {
  const {authenticated} = useSelector(state => state.login);
  const [hideSplash, setHideSplash] = useState(false);

  const config = {
    screens: {
      PrivateScreenNavigation: {
        screens: {
          Dashboard: 'sso/:payload',
        },
      },
    },
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
      {authenticated ? <PrivateScreenNavigation /> : <PublicScreenNavigation />}
    </NavigationContainer>
  );
};

export default RootNavigation;
