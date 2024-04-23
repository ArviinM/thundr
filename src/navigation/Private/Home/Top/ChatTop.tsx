import React from 'react';
import {Top} from '../../../../constants/navigator.ts';
import {CustomTabBar} from './CustomTabBar.tsx';
import ChatList from '../../../../screens/Private/Chat/ChatList.tsx';
export const ChatTop = () => {
  return (
    <Top.Navigator tabBar={props => <CustomTabBar {...props} />}>
      <Top.Screen name="JOWA">{() => <ChatList isMare={false} />}</Top.Screen>
      <Top.Screen name="MARE">{() => <ChatList isMare={true} />}</Top.Screen>
    </Top.Navigator>
  );
};
