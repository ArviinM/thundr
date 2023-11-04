// React modules
import React, {useState, useEffect} from 'react';

// Third party libraries
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

// Utils
import {navigationRef} from './tempNavigation';
import PublicScreenNavigation from './PublicScreenNavigation/PublicScreenNavigation';

const RootNavigation = () => {
  const [hideSplash, setHideSplash] = useState(false);

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
      onReady={() => {
        setHideSplash(true);
      }}
      theme={{colors: {background: '#f2cecd'}}}>
      <PublicScreenNavigation />
    </NavigationContainer>
  );
};

export default RootNavigation;
