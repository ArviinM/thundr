import React from 'react';
import {Top} from '../../../../constants/navigator.ts';
import {CustomPossiblesTabBar} from './CustomPossiblesTabBar.tsx';
import Swipeables from '../../../../components/Possibles/Swipeables.tsx';
import {View} from 'react-native';
export const PossiblesTop = () => {
  return (
    <Top.Navigator
      tabBar={props => <CustomPossiblesTabBar {...props} />}
      sceneContainerStyle={{backgroundColor: 'transparent'}}>
      <Top.Screen name="JOWABLES">
        {() => <Swipeables isMare={false} />}
      </Top.Screen>
      <Top.Screen name="MAREBLES">
        {() => <Swipeables isMare={true} />}
      </Top.Screen>
    </Top.Navigator>
  );
};
