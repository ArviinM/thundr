import React from 'react';
// import {SignInScreen} from '../screens/SignInScreen';
import {Stack} from '../../constants/navigator.ts';
import Login from '../../screens/Public/Login/Login.tsx';
import MobileValidation from '../../screens/Public/Login/MobileValidation.tsx';

export const LoginStack = () => {
  return (
    <Stack.Navigator initialRouteName={'Login'}>
      <Stack.Group
        screenOptions={{
          gestureEnabled: false,
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={Login} />
      </Stack.Group>
      <Stack.Group
        screenOptions={{presentation: 'fullScreenModal', headerShown: false}}>
        <Stack.Screen name="MobileValidation" component={MobileValidation} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
