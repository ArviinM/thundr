import React, {useState} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../constants/commons.ts';
import {SendIcon} from '../../assets/images/chat/SendIcon.tsx';
import {ImagesIcon} from '../../assets/images/chat/ImagesIcon.tsx';
import {CameraIcon} from '../../assets/images/chat/CameraIcon.tsx';
import {Chat, IMessage} from '../../types/generated.ts';
import {scale} from '../../utils/utils.ts';
import {ReplyCloseIcon} from '../../assets/images/chat/ReplyCloseIcon.tsx';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {truncateChatPreview} from '../../screens/Private/Chat/chatUtils.ts';

const ChatInput = ({
  isMare,
  onPressSend,
  onPressImage,
  onPressCamera,
  repliedMessage,
  onClearReply,
  user,
}: {
  isMare: boolean;
  onPressSend: (message: string) => void;
  onPressImage: () => void;
  onPressCamera: () => void;
  repliedMessage: IMessage | null;
  onClearReply: () => void;
  user: Chat;
}) => {
  const [inputText, setInputText] = useState<string>('');
  const isMessageFromSelf = (message: IMessage | undefined) => {
    return message && message.user._id === user.sub;
  };

  const replyContainerTranslateY = useSharedValue(0); // Initial translation is 0

  const replyContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(replyContainerTranslateY.value),
        },
      ],
      opacity: withSpring(repliedMessage ? 1 : 0), // Fade in/out
      height: 'auto',
    };
  });

  return (
    <>
      {repliedMessage && ( // Conditionally render the reply preview
        <Animated.View style={[styles.replyContainer, replyContainerStyle]}>
          <View>
            <Text style={styles.replyUser}>
              Replying to{' '}
              {isMessageFromSelf(repliedMessage)
                ? 'yourself'
                : user.profile.name}
            </Text>
            <Text style={styles.replyMessage}>
              {repliedMessage.attachments &&
              repliedMessage.attachments.length > 0
                ? 'Image 🖼️'
                : truncateChatPreview(repliedMessage.text, 40)}
            </Text>
          </View>
          <View>
            <TouchableOpacity onPress={onClearReply}>
              <ReplyCloseIcon />
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}

      <View style={styles.inputContainer}>
        <View
          style={[
            styles.inputTextContainer,
            {backgroundColor: isMare ? COLORS.secondary2 : COLORS.primary1},
          ]}>
          <TextInput
            style={styles.textInput}
            multiline={true}
            onChangeText={text => setInputText(text)}
            value={inputText}
            placeholder="Type a message.."
            textAlignVertical="center"
            placeholderTextColor={'#ffffff'}
            maxLength={255}
          />
          <TouchableOpacity onPress={onPressCamera} style={{paddingRight: 16}}>
            <CameraIcon />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressImage} style={{paddingRight: 16}}>
            <ImagesIcon />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          disabled={!inputText}
          style={styles.buttonContainer}
          onPress={() => {
            onPressSend(inputText.trim()); // Pass message to callback
            setInputText(''); // Clear input
          }}>
          <SendIcon isMare={isMare} disabled={!inputText} />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'ios' ? 0 : 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
  },
  inputTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderRadius: 25,
    width: '87%',
  },
  buttonContainer: {
    padding: 5,
  },
  textInput: {
    flex: 1,
    padding: 10,
    paddingTop: 12,
    paddingHorizontal: 12,
    minHeight: 40,
    textAlignVertical: 'bottom',
    color: 'white',
    fontFamily: 'Montserrat-Medium',
  },
  replyContainer: {
    paddingHorizontal: 26,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    borderTopWidth: 0.6,
    borderTopColor: 'rgba(14,14,14,0.24)',
  },
  replyUser: {
    fontFamily: 'Montserrat-Regular',
    fontSize: scale(10),
    color: COLORS.black,
  },
  replyMessage: {
    fontSize: scale(14),
    fontFamily: 'Montserrat-Regular',
    color: COLORS.black,
  },
});

export default ChatInput;
