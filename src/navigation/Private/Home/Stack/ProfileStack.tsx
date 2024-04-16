import React from 'react';

import {Stack} from '../../../../constants/navigator.ts';
import Profile from '../../../../screens/Private/Profile/Profile.tsx';
import WorkingInProgress from '../../../../screens/shared/WorkingInProgress.tsx';
import {COLORS} from '../../../../constants/commons.ts';
import {moderateScale} from '../../../../utils/utils.ts';
export const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: COLORS.white,
          },
          headerTintColor: COLORS.primary1,
          headerTitleStyle: {
            fontFamily: 'ClimateCrisis-Regular',
            fontWeight: '500',
            fontSize: moderateScale(20),
          },
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={WorkingInProgress}
        options={{
          headerTitle: 'Edit Profile',
          headerShown: true,
          headerStyle: {
            backgroundColor: COLORS.white,
          },
          headerTintColor: COLORS.primary1,
          headerTitleStyle: {
            fontFamily: 'ClimateCrisis-Regular',
            fontWeight: '500',
            fontSize: moderateScale(20),
          },
        }}
      />
    </Stack.Navigator>
  );
};
