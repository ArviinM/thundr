import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {Chat, IMessage} from '../../types/generated.ts';
import {scale} from '../../utils/utils.ts';
import {COLORS} from '../../constants/commons.ts';
import {TrashIcon} from '../../assets/images/TrashIcon.tsx';
import React, {Fragment} from 'react';
import {Loading} from '../shared/Loading.tsx';
import {Image} from 'expo-image';

import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import MessageReact from './MessageReact.tsx';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import useChatScrollStore from '../../store/chatScrollStore.ts';
import {useShallow} from 'zustand/react/shallow';
import useChatReplyStore from '../../store/chatReplyStore.ts';
import {ReturnArrowIcon} from '../../assets/images/chat/ReturnArrowIcon.tsx';

const MessageBubbleImage = ({
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

  const {setReplyMessage} = useChatReplyStore(
    useShallow(state => ({
      setReplyMessage: state.setReplyMessage,
    })),
  );

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
        message.attachments && (
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
                <View style={[styles.messageImageContainer]}>
                  {/*  Render Image here   */}
                  {message.attachments && message.attachments.length > 0 && (
                    <>
                      {message.attachments.map((attachment, index) => {
                        const numOfAttachments =
                          message.attachments && message.attachments.length;

                        // Adjusted Interpolation Ranges
                        const inputRange = [1, 0, 2];
                        const translateXOutputRange = [
                          index % 2 === 0 ? 25 : -25, // Alternate signs
                          0,
                          index % 2 === 0 ? -25 : 25, // Alternate signs
                        ];
                        const translateYOutputRange = [3, 0, 3];
                        const rotateOutputRange = [
                          index % 2 === 0 ? 10 : -10, // Alternate signs
                          0,
                          index % 2 === 0 ? -10 : 10, // Alternate signs
                        ];
                        const scaleOutputRange = [0.45, 1, 0.85];
                        const opacityOutputRange = [0.7, 1, 0.5];

                        if (message.pending) {
                          return (
                            <View
                              key={index}
                              style={[
                                {
                                  position: 'absolute',
                                  borderRadius: 10,
                                  right: scale(9),
                                  top: scale(9),
                                  width: scale(100),
                                  height: scale(100),
                                  elevation: 3,
                                  backgroundColor: COLORS.gray2,
                                  transform: [
                                    {
                                      translateX: interpolate(
                                        index,
                                        inputRange,
                                        translateXOutputRange,
                                      ),
                                    },
                                    {
                                      translateY: interpolate(
                                        index,
                                        inputRange,
                                        translateYOutputRange,
                                      ),
                                    },
                                    {
                                      rotate: `${interpolate(
                                        index,
                                        inputRange,
                                        rotateOutputRange,
                                      )}deg`,
                                    },
                                    {
                                      scale: interpolate(
                                        index,
                                        inputRange,
                                        scaleOutputRange,
                                      ),
                                    },
                                  ],
                                  opacity: interpolate(
                                    index,
                                    inputRange,
                                    opacityOutputRange,
                                  ),
                                  zIndex: (numOfAttachments || 0) - index,
                                },
                              ]}>
                              <Loading />
                            </View>
                          );
                        }

                        if (!attachment.mimeType || !message.sent) {
                          return null;
                        }

                        return (
                          <Animated.View
                            key={index}
                            style={[
                              {
                                position: 'absolute',
                                borderRadius: 10,
                                right: scale(9),
                                top: scale(9),
                                width: scale(100),
                                height: scale(100),
                                elevation: 3,
                                aspectRatio: 1,
                                // borderWidth: 1,
                                // shadowOffset: {width: 10, height: 10},
                                transform: [
                                  {
                                    translateX: interpolate(
                                      index,
                                      inputRange,
                                      translateXOutputRange,
                                    ),
                                  },
                                  {
                                    translateY: interpolate(
                                      index,
                                      inputRange,
                                      translateYOutputRange,
                                    ),
                                  },
                                  {
                                    rotate: `${interpolate(
                                      index,
                                      inputRange,
                                      rotateOutputRange,
                                    )}deg`,
                                  },
                                  {
                                    scale: interpolate(
                                      index,
                                      inputRange,
                                      scaleOutputRange,
                                    ),
                                  },
                                ],
                                opacity: interpolate(
                                  index,
                                  inputRange,
                                  opacityOutputRange,
                                ),
                                zIndex: (numOfAttachments || 0) - index,
                              },
                              // animatedImageStyles,
                            ]}>
                            {attachment.mimeType && message.sent && (
                              <View>
                                {attachment.blurHash ? (
                                  <Image
                                    source={{uri: attachment.thumbnailUrl}}
                                    style={[styles.messageImage]}
                                    transition={100}
                                    placeholder={attachment.blurHash}
                                  />
                                ) : (
                                  <Image
                                    source={{uri: attachment.thumbnailUrl}}
                                    style={[styles.messageImage]}
                                    transition={100}>
                                    <Text
                                      style={{
                                        fontSize: scale(20),
                                        fontFamily: 'Montserrat-Regular',
                                        color: 'white',
                                      }}>
                                      {index}
                                    </Text>
                                  </Image>
                                )}
                              </View>
                            )}
                          </Animated.View>
                        );
                      })}
                    </>
                  )}
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

export default MessageBubbleImage;

const styles = StyleSheet.create({
  containerWithReact: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 7,
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
    maxWidth: '58%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  messageImageContainer: {
    padding: 0,
    borderRadius: 10,
    marginVertical: 0,
    width: scale(120),
    height: scale(120),
  },
  messageImage: {
    borderRadius: 10,
    width: scale(100),
    height: scale(100),
    aspectRatio: 1,
  },
  messageRight: {
    alignSelf: 'flex-end',
    marginRight: scale(8),
  },
  messageLeft: {
    alignSelf: 'flex-start',
    marginLeft: scale(8),
  },
  messageText: {
    fontSize: scale(14),
    fontFamily: 'Montserrat-Regular',
    color: COLORS.black,
  },
});
