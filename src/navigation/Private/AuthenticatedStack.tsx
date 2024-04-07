import React from 'react';

import {Stack} from '../../constants/navigator.ts';
import {HomeTab} from './Home/Tab/HomeTab.tsx';
import WorkingInProgress from '../../screens/shared/WorkingInProgress.tsx';
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

export const AuthenticatedStack = () => {
  return (
    <Stack.Navigator initialRouteName={'CustomerPersonalityType'}>
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
