import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {Chat, IMessage} from '../../types/generated.ts';
import {formatTimestamp, scale} from '../../utils/utils.ts';
import {COLORS, height, width} from '../../constants/commons.ts';
import {TrashIcon} from '../../assets/images/TrashIcon.tsx';
import React from 'react';
import CheckIcon from '../../assets/images/CheckIcon.tsx';
import MessageReact from './MessageReact.tsx';
import useChatScrollStore from '../../store/chatScrollStore.ts';
import {useShallow} from 'zustand/react/shallow';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {ReturnArrowIcon} from '../../assets/images/chat/ReturnArrowIcon.tsx';
import useChatReplyStore from '../../store/chatReplyStore.ts';

const MessageBubble = ({
  message,
  user,
  isMare,
  onLongPress,
}: {
  message: IMessage;
  user: Chat;
  isMare: boolean;
  onLongPress: () => void;
}) => {
  const isMessageFromSelf = (message: IMessage | undefined) => {
    return message && message.user._id === user.sub;
  };

  const {setIsScroll} = useChatScrollStore(
    useShallow(state => ({
      setIsScroll: state.setIsScroll,
    })),
  );

  const {replyMessage, setReplyMessage, clearReplyMessage} = useChatReplyStore(
    useShallow(state => ({
      replyMessage: state.replyMessage,
      setReplyMessage: state.setReplyMessage,
      clearReplyMessage: state.clearReplyMessage,
    })),
  );

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

  const replyTranslation = useSharedValue(0);
  const replyArrowScale = useSharedValue(0);

  const animateReply = useAnimatedStyle(() => {
    return {
      transform: [{translateX: replyTranslation.value}],
    };
  });

  const isSelf = isMessageFromSelf(message);

  const animateReplyArrow = useAnimatedStyle(() => {
    return {
      transform: [
        {scale: replyArrowScale.value},
        {translateX: isSelf ? 20 : -20},
      ],
    };
  });

  const replyGesture = Gesture.Pan()
    .onBegin(() => {
      runOnJS(setIsScroll)(false);
    })
    .onChange(e => {
      replyTranslation.value = e.translationX;

      if (isSelf) {
        replyArrowScale.value = Math.max(
          0,
          Math.min(1, interpolate(e.translationX, [-30, 0], [1, 0])),
        );
      } else {
        replyArrowScale.value = Math.max(
          0,
          Math.min(1, interpolate(e.translationX, [0, 30], [0, 1])), // Invert the interpolation range
        );
      }
    })
    .onEnd(e => {
      if (!isSelf && Math.max(e.translationX) >= 50) {
        runOnJS(setReplyMessage)(message);
      }
      if (isSelf && Math.max(e.translationX) <= -50) {
        runOnJS(setReplyMessage)(message);
      }

      replyTranslation.value = withSpring(0, {damping: 100, stiffness: 300});
      replyArrowScale.value = withSpring(0, {damping: 100, stiffness: 300});
      runOnJS(setIsScroll)(true);
    })
    .onFinalize(() => runOnJS(setIsScroll)(true))
    .maxPointers(1)
    .minDistance(20);

  return (
    <View>
      {message.replyingId && message.replying && (
        <Animated.View style={[animateReply]}>
          <View
            style={[
              message.replying.attachments &&
              message.replying.attachments.length !== 0
                ? styles.messageImageReplyContainer
                : styles.messageReplyContainer,
              isMessageFromSelf(message)
                ? isMare
                  ? [styles.messageRight]
                  : [styles.messageRight]
                : styles.messageLeft,
            ]}>
            {message.text &&
              message.replying.attachments &&
              message.replying.attachments.length === 0 && (
                <Text style={[styles.messageText, {color: COLORS.gray}]}>
                  {message.replying?.text}
                </Text>
              )}
            {message.replying.attachments &&
              message.replying.attachments.length > 0 && (
                <Text>[Media] 🌠🎥</Text>
              )}
          </View>
        </Animated.View>
      )}

      {message && message.unsent ? (
        <View
          // key={item.key}
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
        message.hiddenForSelf &&
        message.hideForSubs === user.sub ? (
        <View
          // key={item.key}
          style={[
            styles.messageUnsentContainer,
            isMessageFromSelf(message)
              ? styles.messageRight
              : styles.messageLeft,
          ]}>
          <TrashIcon small />
          <Text style={[styles.messageText, {color: COLORS.gray3}]}>
            Message removed
          </Text>
        </View>
      ) : (
        message &&
        message.attachments &&
        message.attachments.length === 0 && (
          <GestureDetector gesture={replyGesture}>
            <Animated.View
              style={[
                animateReply,
                styles.containerWithReact,
                isMessageFromSelf(message)
                  ? isMare
                    ? [styles.messageRight, {marginRight: 0}]
                    : [styles.messageRight, {marginRight: 0}]
                  : [styles.messageLeft, {marginLeft: 0, flexDirection: 'row'}],
              ]}>
              <Animated.View
                style={[animateReplyArrow, {position: 'absolute'}]}>
                <ReturnArrowIcon />
              </Animated.View>
              <TouchableWithoutFeedback onLongPress={onLongPress}>
                <View
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
              <MessageReact
                messageId={message._id as number}
                isMare={isMare}
                initialReactCount={message.reactions?.length || 0}
              />
            </Animated.View>
          </GestureDetector>
        )
      )}
    </View>
  );
};

export default MessageBubble;

const styles = StyleSheet.create({
  containerWithReact: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 10,
  },
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
  messageImageReplyContainer: {
    backgroundColor: '#f0f0f0',
    marginBottom: -20,
    maxWidth: '58%',
    padding: 5,
    borderRadius: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    opacity: 0.3,
  },
  messageUnsentContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '58%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  messageImageContainer: {
    padding: 2,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '58%',
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
    borderRadius: 20,
    margin: 20,
    width: width / 1.07,
    height: height / 1.67,
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
  videoThumbnailContainer: {
    position: 'relative',
    borderRadius: 10,
    width: scale(100),
    height: scale(100),
    aspectRatio: 1,
    backgroundColor: '#563b3b',
  },
  playButtonOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
