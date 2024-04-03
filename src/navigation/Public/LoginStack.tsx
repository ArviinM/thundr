import React from 'react';

import Login from '../../screens/Public/Login/Login.tsx';
import MobileValidation from '../../screens/Public/Login/MobileValidation.tsx';
import LoginValidation from '../../screens/Public/Login/LoginValidation.tsx';
import Terms from '../../screens/Public/Login/Terms.tsx';

import {Stack} from '../../constants/navigator.ts';
import {COLORS} from '../../constants/commons.ts';

export const LoginStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Login'}
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
        statusBarTranslucent: true,
      }}>
      <Stack.Group screenOptions={{statusBarColor: COLORS.primary1}}>
        <Stack.Screen name="Login" component={Login} />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          presentation: 'fullScreenModal',
          headerShown: false,
          statusBarColor: COLORS.white,
          statusBarStyle: 'dark',
        }}>
        <Stack.Screen name="LoginValidation" component={LoginValidation} />
        <Stack.Screen name="MobileValidation" component={MobileValidation} />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          presentation: 'modal',
          headerShown: false,
          statusBarColor: COLORS.white,
          statusBarStyle: 'dark',
          gestureEnabled: true,
        }}>
        <Stack.Screen name="Terms" component={Terms} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
