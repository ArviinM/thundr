import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {RootNavigationParams} from '../../../constants/navigator.ts';
import {Loading} from '../../../components/shared/Loading.tsx';
import ChatHeader from '../../../components/Chat/ChatHeader.tsx';
import {COLORS} from '../../../constants/commons.ts';
import ChatInput from '../../../components/Chat/ChatInput.tsx';

type ChatMessagesScreenRouteProp = RouteProp<
  RootNavigationParams,
  'ChatMessages'
>;

type ChatMessagesProps = {
  route?: ChatMessagesScreenRouteProp;
};

const ChatMessages = ({route}: ChatMessagesProps) => {
  const {user, isMare = false} = route?.params || {};
  if (!user) {
    return <Loading />;
  }

  return (
    <SafeAreaView
      edges={['left', 'right', 'top']}
      style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        {/*Chat Message Header*/}
        <ChatHeader user={user} isMare={isMare} />
        {/*Chat Message Bubbles*/}
        {/*Chat Text Input*/}
        <ChatInput isMare={isMare} />
      </View>
    </SafeAreaView>
  );
};

export default ChatMessages;
