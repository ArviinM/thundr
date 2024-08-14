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
import {animationConfig} from '../../utils/utils.ts';
import {CardStyleInterpolators} from '@react-navigation/stack';

export const LoginStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Login'}
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
        transitionSpec: {
          open: animationConfig,
          close: animationConfig,
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Group>
        <Stack.Screen name="Login" component={Login} />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          // presentation: 'm',
          headerShown: false,
        }}>
        <Stack.Screen name="LoginValidation" component={LoginValidation} />
        <Stack.Screen
          name="ForgetPasswordValidation"
          component={ForgetPasswordValidation}
        />
        <Stack.Screen
          name="ForgetPasswordVerification"
          component={ForgetPasswordVerification}
        />
        <Stack.Screen name="PasswordReset" component={PasswordReset} />
        <Stack.Screen
          name="PasswordNewValidation"
          component={PasswordNewValidation}
        />
        <Stack.Screen
          name="PasswordResetConfirmed"
          component={PasswordResetConfirmed}
        />
        <Stack.Screen name="MobileValidation" component={MobileValidation} />
        <Stack.Screen
          name="MobileVerification"
          component={MobileVerification}
        />
        <Stack.Screen name="EmailValidation" component={EmailValidation} />
        <Stack.Screen name="EmailVerification" component={EmailVerification} />
        <Stack.Screen name="PasswordCreation" component={PasswordCreation} />
        <Stack.Screen name="Maintenance" component={Maintenance} />
        <Stack.Screen name="VersionUpdate" component={VersionUpdate} />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          presentation: 'modal',
          headerShown: false,
          gestureEnabled: true,
        }}>
        <Stack.Screen name="Terms" component={Terms} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
