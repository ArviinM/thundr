import React from 'react';
import {Top} from '../../../../constants/navigator.ts';
import {FeedStack} from '../Stack/FeedStack.tsx';
import WorkingInProgress from '../../../../screens/shared/WorkingInProgress.tsx';
import {COLORS} from '../../../../constants/commons.ts';
import Matches from '../../../../screens/Private/Community/Matches.tsx';
import CommunityLists from '../../../../screens/Private/Community/CommunityLists.tsx';

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
        lazy: true,
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
        component={CommunityLists}
        options={{
          tabBarLabel: 'Community',
        }}
      />
      <Top.Screen
        name={'Matches'}
        component={Matches}
        options={{
          tabBarLabel: 'Matches',
        }}
      />
    </Top.Navigator>
  );
};
