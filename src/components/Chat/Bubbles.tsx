import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {Attachment, IMessage, Chat} from '../../types/generated.ts';

import {COLORS, height, width} from '../../constants/commons.ts';
import {formatTimestamp, scale} from '../../utils/utils.ts';
import {MessageProps} from 'react-native-gifted-chat';
import {Image} from 'expo-image';
import CheckIcon from '../../assets/images/CheckIcon.tsx';
import {Loading} from '../shared/Loading.tsx';

const Bubbles = ({
  props,
  user,
  isMare,
}: {
  props: MessageProps<IMessage>;
  isMare: boolean;
  user: Chat;
}) => {
  const isMessageFromSelf = (message: IMessage) => {
    return message.user._id === user.sub;
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
          <View
            style={[
              styles.bodyContainer,
              {marginBottom: 20, borderRadius: 10},
            ]}>
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
                transition={1000}
              />
            )}
          </View>
        </Animated.View>
      </Modal>
    );
  };

  const renderImage = ({
    item: attachments,
    isSelf: isSelf,
    isPending: isPending,
  }: {
    item: Attachment[];
    isSelf: boolean;
    isPending: boolean;
  }) => {
    // Check if there are exactly 4 attachments
    if (attachments.length === 4) {
      return (
        <View
          key={props.key}
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: isSelf ? 'flex-end' : 'flex-start',
            justifyContent: isSelf ? 'flex-end' : 'flex-start',
            gap: scale(2),
          }}>
          {attachments.map((photo, index) => (
            <>
              {isPending ? (
                <View
                  key={index + Math.random()}
                  style={{
                    borderRadius: 10,
                    width: scale(100),
                    height: scale(100),
                    aspectRatio: 1,
                    backgroundColor: COLORS.gray2,
                  }}>
                  <Loading key={index + Math.random()} />
                </View>
              ) : (
                <TouchableOpacity
                  key={index + Math.random()}
                  onPress={() => {
                    setSelectedImage(photo);
                    setIsVisible(true);
                  }}>
                  <Image
                    key={index + Math.random()}
                    source={{uri: photo}}
                    style={[styles.messageImage]}
                    transition={1000}
                  />
                </TouchableOpacity>
              )}
            </>
          ))}
        </View>
      );
    } else {
      return (
        <View
          key={Math.random()}
          style={{
            flexDirection: 'row',
            gap: scale(2),
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}>
          {attachments.map((photo, index) => (
            <>
              {isPending ? (
                <View
                  key={index + Math.random()}
                  style={{
                    borderRadius: 10,
                    width: scale(100),
                    height: scale(100),
                    aspectRatio: 1,
                    backgroundColor: COLORS.gray2,
                  }}>
                  <Loading key={index + Math.random()} />
                </View>
              ) : (
                <TouchableOpacity
                  key={index + Math.random()}
                  onPress={() => {
                    setSelectedImage(photo);
                    setIsVisible(true);
                  }}>
                  <Image
                    key={index + Math.random()}
                    source={{uri: photo}}
                    style={[styles.messageImage]}
                    transition={1000}
                  />
                </TouchableOpacity>
              )}
            </>
          ))}
        </View>
      );
    }
  };

  const renderItem = ({item: item}: {item: MessageProps<IMessage>}) => {
    const message = item.currentMessage;

    return (
      <>
        {message && message.attachments && message.attachments.length !== 0 ? (
          <View
            key={item.key}
            style={[
              styles.messageImageContainer,
              isMessageFromSelf(message)
                ? styles.messageRight
                : styles.messageLeft,
            ]}>
            {renderImage({
              item: message.attachments,
              isSelf: isMessageFromSelf(message),
              isPending: message.pending || false,
            })}
          </View>
        ) : (
          message && (
            <View
              key={item.key}
              style={[
                styles.messageContainer,
                isMessageFromSelf(message)
                  ? isMare
                    ? [
                        styles.messageRight,
                        {backgroundColor: COLORS.secondary2},
                      ]
                    : [styles.messageRight, {backgroundColor: COLORS.primary1}]
                  : styles.messageLeft,
              ]}>
              <Text
                style={[
                  styles.messageText,
                  isMessageFromSelf(message)
                    ? isMare
                      ? {color: COLORS.white}
                      : {color: COLORS.white}
                    : styles.messageText,
                ]}>
                {message.text}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  marginRight: -2,
                }}>
                <Text
                  style={[
                    styles.timestamp,
                    isMessageFromSelf(message)
                      ? isMare
                        ? {color: COLORS.white}
                        : {color: COLORS.white}
                      : styles.timestamp,
                  ]}>
                  {formatTimestamp(message.createdAt)}
                </Text>
                {isMessageFromSelf(message) && message.received && (
                  <View
                    style={{
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end',
                      flexDirection: 'row',
                      gap: -12,
                    }}>
                    <CheckIcon isRead />
                    <CheckIcon isRead />
                  </View>
                )}

                {message.sent &&
                  isMessageFromSelf(message) &&
                  !message.received && (
                    <View
                      style={{
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                        flexDirection: 'row',
                        gap: -12,
                      }}>
                      <CheckIcon />
                      <CheckIcon />
                    </View>
                  )}

                {message.pending && isMessageFromSelf(message) && (
                  <View
                    style={{
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end',
                    }}>
                    <CheckIcon />
                  </View>
                )}
              </View>
            </View>
          )
        )}
      </>
    );
  };

  return (
    <View key={props.currentMessage?._id}>
      {renderItem({item: props})}
      {imageModal()}
    </View>
  );
};

export default Bubbles;

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
    color: COLORS.black,
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
