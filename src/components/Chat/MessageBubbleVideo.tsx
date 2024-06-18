import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {Chat, IMessage} from '../../types/generated.ts';
import {scale} from '../../utils/utils.ts';
import {COLORS} from '../../constants/commons.ts';
import {TrashIcon} from '../../assets/images/TrashIcon.tsx';
import React, {Fragment, useState} from 'react';
import {Loading} from '../shared/Loading.tsx';
import {Image} from 'expo-image';
import {PlayButton} from '../../assets/images/chat/PlayButton.tsx';
import MessageReact from './MessageReact.tsx';
import useChatScrollStore from '../../store/chatScrollStore.ts';
import {useShallow} from 'zustand/react/shallow';
import useChatReplyStore from '../../store/chatReplyStore.ts';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {ReturnArrowIcon} from '../../assets/images/chat/ReturnArrowIcon.tsx';
import MemoizedMessageGallery from './MessageGallery/MessageGallery.tsx';

const MessageBubbleVideo = ({
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
  const [visible, setVisible] = useState<boolean>(false);

  const isMessageFromSelf = (message: IMessage | undefined) => {
    return message && message.user._id === user.sub;
  };

  const {setIsScroll} = useChatScrollStore(
    useShallow(state => ({
      setIsScroll: state.setIsScroll,
    })),
  );
  const {replyToIndex, setReplyMessage} = useChatReplyStore(
    useShallow(state => ({
      setReplyMessage: state.setReplyMessage,
      replyToIndex: state.replyToIndex,
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
    <>
      <Animated.View
        style={{
          backgroundColor:
            replyToIndex === message._id ? 'rgba(255,201,0,0.1)' : COLORS.white,
        }}>
        {message && message.unsent ? (
          <View
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
                    : [
                        styles.messageLeft,
                        {marginLeft: 0, flexDirection: 'row'},
                      ],
                ]}>
                <Animated.View
                  style={[animateReplyArrow, {position: 'absolute'}]}>
                  <ReturnArrowIcon />
                </Animated.View>
                <TouchableWithoutFeedback
                  onPress={() => setVisible(true)}
                  onLongPress={onLongPress}>
                  <View
                    style={[
                      styles.messageImageContainer,
                      isMessageFromSelf(message)
                        ? styles.messageRight
                        : styles.messageLeft,
                    ]}>
                    {/*  Render Image here   */}
                    {message.attachments && message.attachments.length > 0 && (
                      <>
                        {message.attachments.map((attachment, index) => {
                          if (message.pending) {
                            return (
                              <View
                                key={index}
                                style={{
                                  borderRadius: 10,
                                  width: scale(100),
                                  height: scale(100),
                                  aspectRatio: 1,
                                  backgroundColor: COLORS.gray2,
                                }}>
                                <Loading />
                              </View>
                            );
                          }

                          if (!attachment.mimeType || !message.sent) {
                            return null;
                          }

                          return (
                            <View key={index} style={[]}>
                              {attachment.mimeType && message.sent && (
                                <View>
                                  <View style={styles.videoThumbnailContainer}>
                                    <Image
                                      placeholder={attachment.blurHash}
                                      source={{uri: attachment.thumbnailUrl}}
                                      style={[
                                        styles.messageImage,
                                        {
                                          backgroundColor: '#563b3b',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                        },
                                      ]}
                                    />
                                    <View style={styles.playButtonOverlay}>
                                      <PlayButton />
                                    </View>
                                  </View>
                                </View>
                              )}
                            </View>
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
      </Animated.View>
      <MemoizedMessageGallery
        isVisible={visible}
        setVisible={setVisible}
        attachments={message.attachments || []}
        messageType={message.type}
        createdAt={message.createdAt}
        isMare
        user={user}
        onLongPress={onLongPress}
      />
    </>
  );
};

export default MessageBubbleVideo;

const styles = StyleSheet.create({
  containerWithReact: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 10,
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
    // borderWidth: 1,
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
  videoThumbnailContainer: {
    position: 'relative', // Enable absolute positioning for child elements
    borderRadius: 10,
    width: scale(100),
    height: scale(100),
    aspectRatio: 1,
    backgroundColor: '#563b3b',
  },
  playButtonOverlay: {
    position: 'absolute', // Position absolutely within the container
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
