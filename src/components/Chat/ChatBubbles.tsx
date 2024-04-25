import React from 'react';
import {FlatList, View, Text, StyleSheet, Image} from 'react-native';
import {ChatMessage, Chat, Attachment} from '../../types/generated.ts';
import moment from 'moment';
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
  const formatTimestamp = (timestamp: string) => {
    return moment(timestamp).format('h:mm A');
  };

  const isMessageFromSelf = (message: ChatMessage) => {
    return message.senderSub === user.sub;
  };

  const renderImage = ({item: attachments}: {item: Attachment[]}) => {
    // console.log(attachments);
    return (
      <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
        {attachments.map((photo, index) => (
          <Image
            key={index}
            source={{uri: photo}}
            style={{aspectRatio: 1, height: 100, width: 100}}
          />
        ))}
      </View>
    );
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
      {message.attachments.length !== 0 ? (
        renderImage({item: message.attachments})
      ) : (
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
      )}
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
    maxWidth: '80%',
  },
  messageRight: {
    alignSelf: 'flex-end',
    marginRight: scale(10),
  },
  messageLeft: {
    alignSelf: 'flex-start',
    marginLeft: scale(10),
  },
  messageText: {
    fontSize: scale(14),
    fontFamily: 'Montserrat-Regular',
  },
  timestamp: {
    fontSize: scale(10),
    color: '#888',
    alignSelf: 'flex-end',
    fontFamily: 'Montserrat-Regular',
  },
});
