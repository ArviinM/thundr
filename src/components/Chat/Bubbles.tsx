import React, {useEffect, useState} from 'react';
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
import {formatTimestamp, isImageOrVideo, scale} from '../../utils/utils.ts';
import {MessageProps} from 'react-native-gifted-chat';
import {Image} from 'expo-image';
import CheckIcon from '../../assets/images/CheckIcon.tsx';
import {Loading} from '../shared/Loading.tsx';
import {TrashIcon} from '../../assets/images/TrashIcon.tsx';
import VideoPlayer from 'react-native-media-console';
import {PlayButton} from '../../assets/images/chat/PlayButton.tsx';

const Bubbles = ({
  props,
  user,
  isMare,
  onLongPress,
}: {
  props: MessageProps<IMessage>;
  isMare: boolean;
  user: Chat;
  onLongPress: (message: IMessage) => void;
}) => {
  const isMessageFromSelf = (message: IMessage | undefined) => {
    return message && message.user._id === user.sub;
  };

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [animation] = useState(new Animated.Value(0));
  const [selectedAttachment, setSelectedAttachment] = useState<Attachment>();

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

  // Will refactor this and create a gallery modals
  const attachmentModal = () => {
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
            {selectedAttachment &&
              selectedAttachment.mimeType &&
              isImageOrVideo(selectedAttachment.mimeType) === 'image' && (
                <Image
                  source={{uri: selectedAttachment.fileUrl}}
                  style={{width: '100%', height: '90%'}}
                  transition={100}
                  placeholder={selectedAttachment.blurHash}
                />
              )}

            {selectedAttachment &&
              selectedAttachment.mimeType &&
              isImageOrVideo(selectedAttachment.mimeType) === 'video' && (
                <View style={{width: '100%', height: '90%'}}>
                  <VideoPlayer
                    source={{uri: selectedAttachment.fileUrl}}
                    disableBack
                    disableFullscreen
                  />
                </View>
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
    isReply: isReply,
    message: message,
  }: {
    item: Attachment[];
    isSelf: boolean;
    isPending: boolean;
    isReply?: boolean;
    message: IMessage;
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
          {attachments.map((attachment, index) => (
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
                <View>
                  {attachment.mimeType &&
                    isImageOrVideo(attachment.mimeType) === 'image' && (
                      <TouchableOpacity
                        key={index + Math.random()}
                        disabled={isReply}
                        onLongPress={() => onLongPress(message)}
                        onPress={() => {
                          if (!isReply) {
                            setSelectedAttachment(attachment);
                            setIsVisible(true);
                          }
                        }}>
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
                            transition={100}
                          />
                        )}
                      </TouchableOpacity>
                    )}
                </View>
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
          {attachments.map((attachment, index) => (
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
                <View>
                  {attachment.mimeType &&
                    isImageOrVideo(attachment.mimeType) === 'image' && (
                      <TouchableOpacity
                        key={index + Math.random()}
                        disabled={isReply}
                        onLongPress={() => onLongPress(message)}
                        onPress={() => {
                          if (!isReply) {
                            setSelectedAttachment(attachment);
                            setIsVisible(true);
                          }
                        }}>
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
                            transition={100}
                          />
                        )}
                      </TouchableOpacity>
                    )}

                  {attachment.mimeType &&
                    isImageOrVideo(attachment.mimeType) === 'video' && (
                      <TouchableOpacity
                        key={index + Math.random()}
                        disabled={isReply}
                        onLongPress={() => onLongPress(message)}
                        onPress={() => {
                          if (!isReply) {
                            setSelectedAttachment(attachment);
                            setIsVisible(true);
                          }
                        }}>
                        <View style={styles.videoThumbnailContainer}>
                          <Image
                            key={index + Math.random()}
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
                      </TouchableOpacity>
                    )}
                </View>
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
        ) : message && message.attachments && message.attachments.length > 0 ? (
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
              message: message,
            })}
          </View>
        ) : (
          message && (
            <>
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

  return (
    <>
      {renderItem({item: props})}
      {attachmentModal()}
    </>
  );
};

export default Bubbles;

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
