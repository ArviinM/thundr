import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Platform, Text, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {RootNavigationParams} from '../../../constants/navigator.ts';
import {Loading} from '../../../components/shared/Loading.tsx';
import ChatHeader from '../../../components/Chat/ChatHeader.tsx';
import {COLORS} from '../../../constants/commons.ts';
import ChatInput from '../../../components/Chat/ChatInput.tsx';
import ChatBubbles from '../../../components/Chat/ChatBubbles.tsx';
import {
  KeyboardAvoidingView,
  KeyboardStickyView,
} from 'react-native-keyboard-controller';
import {scale} from '../../../utils/utils.ts';
import {useGetChatMessage} from '../../../hooks/chat/useGetChatMessage.ts';

type ChatMessagesScreenRouteProp = RouteProp<
  RootNavigationParams,
  'ChatMessages'
>;

type ChatMessagesProps = {
  route?: ChatMessagesScreenRouteProp;
};

const ChatMessages = ({route}: ChatMessagesProps) => {
  const {user, isMare = false} = route?.params || {};

  const chatMessage = useGetChatMessage({
    sub: user?.sub || '',
    chatRoomID: user?.chatRoomUuid || '',
    limit: 50,
  });

  return (
    <SafeAreaView
      edges={['left', 'right', 'top', 'bottom']}
      style={{flex: 1, backgroundColor: COLORS.white}}>
      {chatMessage.isLoading ? (
        <Loading />
      ) : chatMessage.isSuccess && user ? (
        <View style={{flex: 1, backgroundColor: COLORS.white}}>
          {/*Chat Message Header*/}
          <ChatHeader user={user} isMare={isMare} />
          {/*Chat Message Bubbles*/}
          <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={'padding'}
            keyboardVerticalOffset={
              Platform.OS === 'ios' ? scale(120) : scale(100)
            }>
            <ChatBubbles
              user={user}
              isMare={isMare}
              chatMessages={chatMessage.data}
            />
          </KeyboardAvoidingView>
          {/*Chat Text Input*/}
          <KeyboardStickyView
            offset={{closed: 0, opened: Platform.OS === 'ios' ? 20 : -16}}>
            <ChatInput isMare={isMare} />
          </KeyboardStickyView>
        </View>
      ) : (
        <Text>If you saw me, please do report.</Text>
      )}
    </SafeAreaView>
  );
};

export default ChatMessages;
