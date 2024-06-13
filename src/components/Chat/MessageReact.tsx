import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {ReactIcon} from '../../assets/images/chat/ReactIcon.tsx';
import {useChatContext} from '../../screens/Private/Chat/ChatMessages.tsx';
import {scale} from '../../utils/utils.ts';

interface MessageReactProps {
  messageId: number;
  initialReactCount: number; // Added prop for initial count
  isMare: boolean;
}

const MessageReact: React.FC<MessageReactProps> = ({
  messageId,
  initialReactCount,
  isMare,
}) => {
  const chat = useChatContext();

  const handlePressReact = () => {
    chat.handleReactMessage(messageId);
  };

  return (
    <TouchableOpacity onPress={handlePressReact} style={styles.container}>
      <ReactIcon isMare={isMare} count={initialReactCount} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Arrange button and count horizontally
    alignItems: 'center',
    // borderWidth: 1,
    height: scale(30),
    width: scale(30),
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    backgroundColor: 'rgba(232,227,227,0.5)',
  },
});

export default MessageReact;
