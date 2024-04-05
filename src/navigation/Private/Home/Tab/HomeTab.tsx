import React from 'react';
import {Tab} from '../../../../constants/navigator.ts';
import Home from '../../../../screens/Private/Home/Home.tsx';
import WorkingInProgress from '../../../../screens/shared/WorkingInProgress.tsx';
import {COLORS} from '../../../../constants/commons.ts';

export const HomeTab = () => {
  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.white,
        },
        headerTintColor: COLORS.primary1,
        headerTitleStyle: {
          fontFamily: 'ClimateCrisis-Regular',
          fontWeight: '500',
        },
        headerTitleAlign: 'center',
      }}>
      <Tab.Screen name="Lightning Round" component={WorkingInProgress} />
      <Tab.Screen name="Profile" component={WorkingInProgress} />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: 'THUNDR',
        }}
      />
      <Tab.Screen name="Possibles" component={WorkingInProgress} />
      <Tab.Screen name="Chat" component={WorkingInProgress} />
    </Tab.Navigator>
  );
};
