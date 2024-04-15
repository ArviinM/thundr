import React from 'react';

import {Stack} from '../../constants/navigator.ts';
import {HomeTab} from './Home/Tab/HomeTab.tsx';

import CustomerName from '../../screens/Private/ProfileCreation/CustomerName.tsx';
import {COLORS} from '../../constants/commons.ts';
import {Platform} from 'react-native';
import CustomerBirthday from '../../screens/Private/ProfileCreation/CustomerBirthday.tsx';
import CustomerGender from '../../screens/Private/ProfileCreation/CustomerGender.tsx';
import CustomerRequestAccess from '../../screens/Private/ProfileCreation/CustomerRequestAccess.tsx';
import CompatibilityQuestions from '../../screens/Private/ProfileCreation/CompatibilityQuestions.tsx';
import CustomerInterests from '../../screens/Private/ProfileCreation/CustomerInterests.tsx';
import CustomerAdditionalInfos from '../../screens/Private/ProfileCreation/CustomerAdditionalInfos.tsx';
import CustomerPersonalityType from '../../screens/Private/ProfileCreation/CustomerPersonalityType.tsx';
import CustomerPhotoBio from '../../screens/Private/ProfileCreation/CustomerPhotoBio.tsx';
import Onboarding from '../../screens/Private/ProfileCreation/Onboarding.tsx';
import {useAuth} from '../../providers/Auth.tsx';
import MatchFound from '../../screens/Private/MatchFound/MatchFound.tsx';

export const AuthenticatedStack = () => {
  const auth = useAuth();
  let initialRouteName;

  if (auth.authData?.forProfileCreation) {
    initialRouteName = 'CustomerName';
  } else {
    initialRouteName = 'HomeTab';
  }

  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      {/*  Stack for Profile Creation*/}
      <Stack.Group
        screenOptions={{
          headerShown: false,
          statusBarColor: 'white',
          statusBarAnimation: Platform.OS === 'android' ? 'fade' : undefined,
        }}>
        <Stack.Screen name="CustomerName" component={CustomerName} />
        <Stack.Screen name="CustomerBirthday" component={CustomerBirthday} />
        <Stack.Screen name="CustomerGender" component={CustomerGender} />
        <Stack.Screen
          name="CustomerRequestAccess"
          component={CustomerRequestAccess}
        />
        <Stack.Screen
          name="CompatibilityQuestions"
          component={CompatibilityQuestions}
        />
        <Stack.Screen name="CustomerInterests" component={CustomerInterests} />
        <Stack.Screen
          name="CustomerAdditionalInfos"
          component={CustomerAdditionalInfos}
        />
        <Stack.Screen
          name="CustomerPersonalityType"
          component={CustomerPersonalityType}
        />
        <Stack.Screen name="CustomerPhotoBio" component={CustomerPhotoBio} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
      </Stack.Group>
      {/*  Main Group for Home Swiping Page */}
      <Stack.Group
        screenOptions={{
          headerShown: false,
          statusBarColor: COLORS.white,
          statusBarStyle: Platform.OS === 'android' ? 'dark' : undefined,
          statusBarAnimation: Platform.OS === 'android' ? 'fade' : undefined,
        }}>
        <Stack.Screen name="HomeTab" component={HomeTab} />
        <Stack.Screen
          name="MatchFound"
          component={MatchFound}
          options={{
            statusBarColor: COLORS.primary1,
            statusBarTranslucent: true,
            animation: 'slide_from_bottom',
            statusBarStyle: Platform.OS === 'android' ? 'light' : undefined,
            statusBarAnimation: Platform.OS === 'android' ? 'fade' : undefined,
          }}
        />
      </Stack.Group>
      {/*<Stack.Group />*/}
    </Stack.Navigator>
  );
};
