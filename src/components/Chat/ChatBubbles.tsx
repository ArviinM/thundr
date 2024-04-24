import React from 'react';
import {FlatList, View, Text, StyleSheet} from 'react-native';
import {ChatMessage, Chat} from '../../types/generated.ts';
import moment from 'moment';
import {chatMockMessage} from '../../screens/Private/Chat/chatMockMessage.ts';
import {COLORS} from '../../constants/commons.ts';
import {scale} from '../../utils/utils.ts';

const ChatBubbles = ({
  user,
  isMare,
  chatMessages,
}: {
  user: Chat;
  isMare: boolean;
  chatMessages: ChatMessage[];
}) => {
  // Function to format the timestamp
  const formatTimestamp = (timestamp: string) => {
    return moment(timestamp).format('h:mm A'); // e.g., Apr 23, Wednesday
  };

  const isMessageFromSelf = (message: ChatMessage) => {
    return message.senderSub === user.profile.sub;
  };

  const renderItem = ({item: message}: {item: ChatMessage}) => (
    <View
      style={[
        styles.messageContainer,
        isMessageFromSelf(message)
          ? isMare
            ? [styles.messageRight, {backgroundColor: COLORS.secondary2}]
            : [styles.messageRight, {backgroundColor: COLORS.primary1}]
          : styles.messageLeft,
      ]}>
      <Text
        style={[
          styles.messageText,
          isMessageFromSelf(message)
            ? isMare
              ? [{color: COLORS.white}]
              : [{color: COLORS.white}]
            : styles.messageText,
        ]}>
        {message.message}
      </Text>
      <Text
        style={[
          styles.timestamp,
          isMessageFromSelf(message)
            ? isMare
              ? [{color: COLORS.white}]
              : [{color: COLORS.white}]
            : styles.timestamp,
        ]}>
        {formatTimestamp(message.created)}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={chatMessages} // Assuming 'messages' array exists within the 'user' object
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      inverted
      keyboardShouldPersistTaps="handled"
    />
  );
};

export default ChatBubbles;

const styles = StyleSheet.create({
  messageContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%', // Limit message width
  },
  messageRight: {
    alignSelf: 'flex-end',
    marginRight: scale(10), // Adjust spacing as needed
  },
  messageLeft: {
    alignSelf: 'flex-start',
    marginLeft: scale(10), // Adjust spacing as needed
  },
  messageText: {
    fontSize: scale(14),
    fontFamily: 'Montserrat-Regular',
  },
  timestamp: {
    fontSize: scale(10),
    color: '#888',
    alignSelf: 'flex-end', // Align timestamp to the right
    fontFamily: 'Montserrat-Regular',
  },
});
