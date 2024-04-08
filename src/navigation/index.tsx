import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BootSplash from 'react-native-bootsplash';
import {navigationRef} from '../constants/navigator.ts';
import {useAuth} from '../providers/Auth.tsx';
import {Loading} from '../components/shared/Loading.tsx';
import {LoginStack} from './Public/LoginStack.tsx';
import {AuthenticatedStack} from './Private/AuthenticatedStack.tsx';

const RootNavigation = () => {
  const {authData, loading} = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        BootSplash.hide({fade: true});
      }}>
      {authData ? <AuthenticatedStack /> : <LoginStack />}
    </NavigationContainer>
  );
};

export default RootNavigation;
