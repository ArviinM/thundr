import React from 'react';

import {Stack} from '../../constants/navigator.ts';
import {HomeTab} from './Home/Tab/HomeTab.tsx';
import WorkingInProgress from '../../screens/shared/WorkingInProgress.tsx';
import CustomerName from '../../screens/Private/ProfileCreation/CustomerName.tsx';
import {COLORS} from '../../constants/commons.ts';
import {Platform} from 'react-native';
import CustomerBirthday from '../../screens/Private/ProfileCreation/CustomerBirthday.tsx';
import CustomerGender from '../../screens/Private/ProfileCreation/CustomerGender.tsx';

export const AuthenticatedStack = () => {
  return (
    <Stack.Navigator initialRouteName={'CustomerGender'}>
      {/*  Stack for Profile Creation*/}
      <Stack.Group
        screenOptions={{
          // presentation: 'm',
          headerShown: false,
          statusBarColor: COLORS.white,
          // statusBarStyle: 'dark',
          statusBarStyle: Platform.OS === 'android' ? 'dark' : undefined,
          statusBarAnimation: Platform.OS === 'android' ? 'fade' : undefined,
        }}>
        <Stack.Screen name="CustomerName" component={CustomerName} />
        <Stack.Screen name="CustomerBirthday" component={CustomerBirthday} />
        <Stack.Screen name="CustomerGender" component={CustomerGender} />
        <Stack.Screen
          name="CustomerRequestAccess"
          component={WorkingInProgress}
        />
        <Stack.Screen
          name="CompatibilityQuestions"
          component={WorkingInProgress}
        />
        <Stack.Screen name="Interests" component={WorkingInProgress} />
        <Stack.Screen
          name="CustomerAdditionalDetails"
          component={WorkingInProgress}
        />
        <Stack.Screen
          name="CustomerPersonality"
          component={WorkingInProgress}
        />
        <Stack.Screen
          name="CustomerAdditionalDetails2"
          component={WorkingInProgress}
        />
      </Stack.Group>
      {/*  Main Group for Home Swiping Page */}
      <Stack.Group>
        <Stack.Screen name="HomeTab" component={HomeTab} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
