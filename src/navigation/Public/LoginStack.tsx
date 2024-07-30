import React from 'react';

import Login from '../../screens/Public/Login/Login.tsx';
import MobileValidation from '../../screens/Public/Login/MobileValidation.tsx';
import LoginValidation from '../../screens/Public/Login/LoginValidation.tsx';
import Terms from '../../screens/Public/Login/Terms.tsx';

import {Stack} from '../../constants/navigator.ts';
import {COLORS} from '../../constants/commons.ts';
import MobileVerification from '../../screens/Public/Login/MobileVerification.tsx';
import {Platform} from 'react-native';
import EmailValidation from '../../screens/Public/Login/EmailValidation.tsx';
import EmailVerification from '../../screens/Public/Login/EmailVerification.tsx';
import PasswordCreation from '../../screens/Public/Login/PasswordCreation.tsx';
import ForgetPasswordValidation from '../../screens/Public/Login/ForgetPasswordValidation.tsx';
import ForgetPasswordVerification from '../../screens/Public/Login/ForgetPasswordVerification.tsx';
import PasswordReset from '../../screens/Public/Login/PasswordReset.tsx';
import PasswordNewValidation from '../../screens/Public/Login/PasswordNewValidation.tsx';
import PasswordResetConfirmed from '../../screens/Public/Login/PasswordResetConfirmed.tsx';
import Maintenance from '../../screens/shared/Maintenance.tsx';
import VersionUpdate from '../../screens/shared/VersionUpdate.tsx';

export const LoginStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Login'}
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
        statusBarTranslucent: true,
        statusBarAnimation: Platform.OS === 'android' ? 'fade' : undefined,
      }}>
      <Stack.Group screenOptions={{statusBarColor: COLORS.primary1}}>
        <Stack.Screen name="Login" component={Login} />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          // presentation: 'm',
          headerShown: false,
          statusBarColor: COLORS.white,
          // statusBarStyle: 'dark',
          statusBarStyle: Platform.OS === 'android' ? 'dark' : undefined,
          statusBarAnimation: Platform.OS === 'android' ? 'fade' : undefined,
        }}>
        <Stack.Screen name="LoginValidation" component={LoginValidation} />
        <Stack.Screen
          name="ForgetPasswordValidation"
          component={ForgetPasswordValidation}
          options={{animation: 'fade'}}
        />
        <Stack.Screen
          name="ForgetPasswordVerification"
          component={ForgetPasswordVerification}
          options={{animation: 'fade'}}
        />
        <Stack.Screen
          name="PasswordReset"
          component={PasswordReset}
          options={{animation: 'fade'}}
        />
        <Stack.Screen
          name="PasswordNewValidation"
          component={PasswordNewValidation}
          options={{animation: 'fade'}}
        />
        <Stack.Screen
          name="PasswordResetConfirmed"
          component={PasswordResetConfirmed}
          options={{animation: 'fade'}}
        />
        <Stack.Screen
          name="MobileValidation"
          component={MobileValidation}
          options={{animation: 'slide_from_right'}}
        />
        <Stack.Screen
          name="MobileVerification"
          component={MobileVerification}
          options={{animation: 'fade'}}
        />
        <Stack.Screen
          name="EmailValidation"
          component={EmailValidation}
          options={{animation: 'fade'}}
        />
        <Stack.Screen
          name="EmailVerification"
          component={EmailVerification}
          options={{animation: 'fade'}}
        />
        <Stack.Screen
          name="PasswordCreation"
          component={PasswordCreation}
          options={{animation: 'fade'}}
        />
        <Stack.Screen
          name="Maintenance"
          component={Maintenance}
          options={{animation: 'fade'}}
        />
        <Stack.Screen
          name="VersionUpdate"
          component={VersionUpdate}
          options={{animation: 'fade'}}
        />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          presentation: 'modal',
          headerShown: false,
          statusBarColor: COLORS.white,
          statusBarStyle: 'dark',
          gestureEnabled: true,
          statusBarAnimation: Platform.OS === 'android' ? 'fade' : undefined,
        }}>
        <Stack.Screen name="Terms" component={Terms} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
