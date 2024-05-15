import React from 'react';
import {RootNavigationParams, Top} from '../../../../constants/navigator.ts';
import {CustomTabBar} from './CustomTabBar.tsx';
import ChatList from '../../../../screens/Private/Chat/ChatList.tsx';
import {RouteProp} from '@react-navigation/native';

type ChatTopScreenRouteProp = RouteProp<RootNavigationParams, 'Messages'>;

type ChatTopProps = {
  route?: ChatTopScreenRouteProp;
};

export const ChatTop = ({route}: ChatTopProps) => {
  const {isMare, chatRoomId} = route?.params || {};

  return (
    <Top.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      initialRouteName={isMare ? 'MARE' : 'JOWA'}>
      <Top.Screen name="JOWA">
        {() => (
          <ChatList isMare={false} chatRoom={chatRoomId} notifIsMare={isMare} />
        )}
      </Top.Screen>
      <Top.Screen name="MARE">
        {() => (
          <ChatList isMare={true} chatRoom={chatRoomId} notifIsMare={isMare} />
        )}
      </Top.Screen>
    </Top.Navigator>
  );
};
