import React, {useEffect, useState} from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {ChatMessage, Chat, Attachment} from '../../types/generated.ts';
import moment from 'moment';
import {COLORS, height, width} from '../../constants/commons.ts';
import {scale} from '../../utils/utils.ts';
import {isVisible} from 'react-native-bootsplash';

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

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [animation] = useState(new Animated.Value(0));
  const [selectedImage, setSelectedImage] = useState<string>(
    'https://placehold.co/400',
  );

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isVisible ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [animation, isVisible]);

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const scaleAnim = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.95, 1],
  });

  const imageModal = () => {
    return (
      <Modal
        transparent
        animationType="fade"
        visible={isVisible}
        onDismiss={() => setIsVisible(false)}
        onRequestClose={() => setIsVisible(false)}>
        <Animated.View
          style={[
            styles.container,
            {opacity, transform: [{scale: scaleAnim}]},
          ]}>
          <View style={[styles.bodyContainer, {marginBottom: 20}]}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: isMare ? COLORS.secondary2 : COLORS.primary1,
                },
              ]}
              onPress={() => setIsVisible(false)}>
              <Text style={[styles.buttonText]}>Close</Text>
            </TouchableOpacity>

            {/* Display Selected Image */}
            {selectedImage && (
              <Image
                source={{uri: selectedImage}}
                style={{width: '100%', height: '90%'}}
                resizeMode="contain"
              />
            )}
          </View>
        </Animated.View>
      </Modal>
    );
  };

  const renderImage = ({item: attachments}: {item: Attachment[]}) => {
    // Check if there are exactly 4 attachments
    if (attachments.length === 4) {
      return (
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            gap: scale(2),
          }}>
          {attachments.map((photo, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectedImage(photo);
                setIsVisible(true); // Trigger animation and modal
              }}>
              <Image source={{uri: photo}} style={[styles.messageImage]} />
            </TouchableOpacity>
          ))}
        </View>
      );
    } else {
      return (
        <View
          style={{
            flexDirection: 'row',
            gap: scale(2),
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}>
          {attachments.map((photo, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectedImage(photo);
                setIsVisible(true); // Trigger animation and modal
              }}>
              <Image source={{uri: photo}} style={[styles.messageImage]} />
            </TouchableOpacity>
          ))}
        </View>
      );
    }
  };

  const renderItem = ({item: message}: {item: ChatMessage}) =>
    message.attachments.length !== 0 ? (
      <View
        style={[
          styles.messageImageContainer,
          isMessageFromSelf(message) ? styles.messageRight : styles.messageLeft,
        ]}>
        {renderImage({item: message.attachments})}
      </View>
    ) : (
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
    <>
      <FlatList
        data={chatMessages} // Assuming 'messages' array exists within the 'user' object
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        inverted
        keyboardShouldPersistTaps="handled"
      />
      {imageModal()}
    </>
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
  messageImageContainer: {
    // backgroundColor: '#f0f0f0',
    padding: 2,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  messageImage: {
    borderRadius: 10,
    width: scale(100),
    height: scale(100),
    aspectRatio: 1,
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
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    justifyContent: 'center',
  },
  bodyContainer: {
    // backgroundColor: COLORS.white,
    // padding: 10,
    borderRadius: 20,
    margin: 20,
    width: width / 1.07,
    height: height / 1.67,
  },
  button: {
    position: 'absolute',
    top: scale(-46),
    right: 0,
    zIndex: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold',
  },
});
