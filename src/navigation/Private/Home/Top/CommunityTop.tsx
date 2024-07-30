import React from 'react';
import {Top} from '../../../../constants/navigator.ts';
import {FeedStack} from '../Stack/FeedStack.tsx';
import WorkingInProgress from '../../../../screens/shared/WorkingInProgress.tsx';
import {COLORS} from '../../../../constants/commons.ts';
import {Loading} from '../../../../components/shared/Loading.tsx';

export const CommunityTop = () => {
  return (
    <Top.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          textTransform: 'capitalize',
          fontFamily: 'Montserrat-Bold',
        },
        tabBarIndicatorStyle: {
          height: 2,
          borderRadius: 5,
          backgroundColor: COLORS.primary1,
        },
        tabBarActiveTintColor: COLORS.primary1,
        tabBarInactiveTintColor: COLORS.black4,
      }}>
      <Top.Screen
        name={'FeedStack'}
        component={FeedStack}
        options={{
          tabBarLabel: 'Feed',
        }}
      />
      <Top.Screen
        name={'Community'}
        component={WorkingInProgress} //Community Stack
        options={{
          tabBarLabel: 'Community',
        }}
      />
      <Top.Screen
        name={'Matches'}
        component={Loading}
        options={{
          tabBarLabel: 'Your Matches',
        }}
      />
    </Top.Navigator>
  );
};
