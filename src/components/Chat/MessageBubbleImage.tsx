import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Attachment, Chat, IMessage} from '../../types/generated.ts';
import {formatTimestamp, isImageOrVideo, scale} from '../../utils/utils.ts';
import {COLORS, height, width} from '../../constants/commons.ts';
import {TrashIcon} from '../../assets/images/TrashIcon.tsx';
import React, {Fragment} from 'react';
import {Loading} from '../shared/Loading.tsx';
import {Image} from 'expo-image';
import CheckIcon from '../../assets/images/CheckIcon.tsx';
import {PlayButton} from '../../assets/images/chat/PlayButton.tsx';
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const MessageBubbleImage = ({
  message,
  user,
  isMare,
}: {
  message: IMessage;
  user: Chat;
  isMare: boolean;
}) => {
  const isMessageFromSelf = (message: IMessage | undefined) => {
    return message && message.user._id === user.sub;
  };

  const imageOffset = useSharedValue(0); // Shared value for animation

  const animatedImageStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          imageOffset.value,
          [0, 1],
          [0, -20], // Adjust the offset as needed
        ),
      },
      {
        translateX: interpolate(
          imageOffset.value,
          [0, 1],
          [0, imageOffset.value % 2 === 0 ? -20 : 20], // Alternate left/right
        ),
      },
    ],
    zIndex: imageOffset.value, // Stacking order
  }));

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
          <>
            <TouchableWithoutFeedback>
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
                    {message.attachments.map((attachment, index) => (
                      <View key={index}>
                        {message.pending && (
                          <View
                            key={index}
                            style={{
                              borderRadius: 10,
                              width: scale(100),
                              height: scale(100),
                              aspectRatio: 1,
                              backgroundColor: COLORS.gray2,
                              // borderWidth: 1,
                            }}>
                            <Loading />
                          </View>
                        )}
                        {attachment.mimeType && message.sent && (
                          <TouchableOpacity
                            // disabled={isReply}
                            // onLongPress={() => onLongPress(message)}
                            onPress={() => {
                              // if (!isReply) {
                              //   setSelectedAttachment(attachment);
                              //   setIsVisible(true);
                              // }
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
                    ))}
                  </>
                )}
              </View>
            </TouchableWithoutFeedback>
          </>
        )
      )}
    </View>
  );
};

export default MessageBubbleImage;

const styles = StyleSheet.create({
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
});
