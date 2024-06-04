import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {Attachment, IMessage, Chat} from '../../types/generated.ts';

import {COLORS, height, width} from '../../constants/commons.ts';
import {formatTimestamp, scale} from '../../utils/utils.ts';
import {isSameUser, MessageProps} from 'react-native-gifted-chat';
import {Image} from 'expo-image';
import CheckIcon from '../../assets/images/CheckIcon.tsx';
import {Loading} from '../shared/Loading.tsx';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {ReturnArrowIcon} from '../../assets/images/chat/ReturnArrowIcon.tsx';
import {isSameDay} from './Day.tsx';
import useChatReplyStore from '../../store/chatReplyStore.ts';
import {TrashIcon} from '../../assets/images/TrashIcon.tsx';

const Bubbles = ({
  props,
  user,
  isMare,
  setReplyOnSwipeOpen,
  onLongPress,
}: {
  props: MessageProps<IMessage>;
  isMare: boolean;
  user: Chat;
  setReplyOnSwipeOpen: (message: IMessage) => void;
  onLongPress: (message: IMessage) => void;
}) => {
  const isNextMyMessage =
    props.currentMessage &&
    props.nextMessage &&
    isSameUser(props.currentMessage, props.nextMessage) &&
    isSameDay(props.currentMessage, props.nextMessage);

  const {replyMessage} = useChatReplyStore();

  const isMessageFromSelf = (message: IMessage | undefined) => {
    return message && message.user._id === user.sub;
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
          key={props.key}
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
        {message && message.unsent ? (
          <View
            key={item.key}
            style={[
              styles.messageUnsentContainer,
              isMessageFromSelf(message)
                ? styles.messageRight
                : styles.messageLeft,
            ]}>
            <TrashIcon small />
            <Text style={[styles.messageText, {color: COLORS.gray3}]}>
              Message deleted
            </Text>
          </View>
        ) : message &&
          message.attachments &&
          message.attachments.length !== 0 ? (
          <TouchableWithoutFeedback onLongPress={() => onLongPress(message)}>
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
                isSelf: isMessageFromSelf(message) || false,
                isPending: message.pending || false,
              })}
            </View>
          </TouchableWithoutFeedback>
        ) : (
          message && (
            <>
              {message.replyingId && (
                <TouchableWithoutFeedback
                  onPress={() => console.log('reply was pressed')}>
                  <View
                    key={item.key}
                    style={[
                      styles.messageReplyContainer,
                      isMessageFromSelf(message)
                        ? isMare
                          ? [styles.messageRight]
                          : [styles.messageRight]
                        : styles.messageLeft,
                    ]}>
                    <Text style={[styles.messageText, {color: COLORS.gray}]}>
                      {message.replying?.text}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              )}
              <TouchableWithoutFeedback
                onLongPress={() => onLongPress(message)}>
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
                        : [
                            styles.messageRight,
                            {backgroundColor: COLORS.primary1},
                          ]
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
                    {renderMessageSeenSentPending(message)}
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </>
          )
        )}
      </>
    );
  };

  const renderMessageSeenSentPending = (message: IMessage) => {
    return (
      <>
        {/*Message Seen, Sent, Sending*/}
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

        {message.sent && isMessageFromSelf(message) && !message.received && (
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
      </>
    );
  };

  const renderLeftActions = (progressAnimatedValue: any) => {
    const size = progressAnimatedValue.interpolate({
      inputRange: [0, 1, 100],
      outputRange: [0, 1, 1],
    });
    const trans = progressAnimatedValue.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 12, 20],
    });

    return (
      <>
        {props.currentMessage &&
          !isMessageFromSelf(props.currentMessage) &&
          !props.currentMessage.unsent && (
            <Animated.View
              style={[
                styles.containerReply,
                {transform: [{scale: size}, {translateX: trans}]},
                !isNextMyMessage
                  ? styles.defaultBottomOffset
                  : styles.bottomOffsetNext,
                props.position === 'left' && {marginRight: 16},
              ]}>
              <View style={styles.replyImageWrapper}>
                <ReturnArrowIcon />
              </View>
            </Animated.View>
          )}
      </>
    );
  };

  const renderRightActions = (progressAnimatedValue: any) => {
    const size = progressAnimatedValue.interpolate({
      inputRange: [0, 1, 100],
      outputRange: [0, 1, 1],
    });
    const trans = progressAnimatedValue.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, -12, -20],
    });

    return (
      <>
        {props.currentMessage &&
          isMessageFromSelf(props.currentMessage) &&
          !props.currentMessage.unsent && (
            <Animated.View
              style={[
                styles.containerReply,
                {transform: [{scale: size}, {translateX: trans}]},
                isNextMyMessage
                  ? styles.defaultBottomOffset
                  : styles.bottomOffsetNext,
                props.position === 'right' && styles.leftOffsetValue,
              ]}>
              <View style={styles.replyImageWrapper}>
                <ReturnArrowIcon />
              </View>
            </Animated.View>
          )}
      </>
    );
  };

  const onSwipeOpenAction = () => {
    if (props.currentMessage) {
      setReplyOnSwipeOpen({...props.currentMessage});
    }
  };

  const swipeableRef = useRef<Swipeable>(null);

  // Clean up the swipeable ref when the reply message changes
  useEffect(() => {
    if (replyMessage && swipeableRef.current) {
      swipeableRef.current.close();
    }
  }, [replyMessage]);

  return (
    <GestureHandlerRootView>
      <Swipeable
        ref={swipeableRef}
        friction={2}
        leftThreshold={40}
        rightThreshold={40}
        renderLeftActions={renderLeftActions}
        renderRightActions={renderRightActions}
        onSwipeableOpen={onSwipeOpenAction}>
        {renderItem({item: props})}
        {imageModal()}
      </Swipeable>
    </GestureHandlerRootView>
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
  messageReplyContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    marginBottom: -15,
    maxWidth: '85%',
  },
  messageUnsentContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  messageImageContainer: {
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
  containerReply: {
    width: 16,
  },
  replyImageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  replyImage: {
    width: 20,
    height: 20,
  },
  defaultBottomOffset: {
    marginBottom: 2,
  },
  bottomOffsetNext: {
    marginBottom: 10,
  },
  leftOffsetValue: {
    marginLeft: 16,
  },
});
