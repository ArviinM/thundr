import React, {useEffect, useRef, useState} from 'react';
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
import {scale} from '../../utils/utils.ts';
import {useChatContext} from '../../screens/Private/Chat/ChatMessages.tsx';
import {IMessage} from '../../types/generated.ts';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import useChatReplyStore from '../../store/chatReplyStore.ts';
import {useShallow} from 'zustand/react/shallow';
import {truncateChatPreview} from '../../screens/Private/Chat/chatUtils.ts';
import {ReplyCloseIcon} from '../../assets/images/chat/ReplyCloseIcon.tsx';

const MessageInput = () => {
  const chat = useChatContext();
  const [inputText, setInputText] = useState<string>('');

  const {replyMessage, setReplyMessage, clearReplyMessage} = useChatReplyStore(
    useShallow(state => ({
      replyMessage: state.replyMessage,
      setReplyMessage: state.setReplyMessage,
      clearReplyMessage: state.clearReplyMessage,
    })),
  );

  const isMessageFromSelf = (message: IMessage | undefined) => {
    return message && message.user._id === chat.user.sub;
  };

  const replyContainerTranslateY = useSharedValue(0); // Initial translation is 0

  const replyContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(replyContainerTranslateY.value),
        },
      ],
      opacity: withSpring(replyMessage ? 1 : 0), // Fade in/out
      height: 'auto',
    };
  });

  const inputRef = useRef<TextInput>(null); // Ref to access the TextInput

  useEffect(() => {
    // Automatically focus the TextInput when it's rendered
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <View>
      {replyMessage && ( // Conditionally render the reply preview
        <Animated.View style={[styles.replyContainer, replyContainerStyle]}>
          <View>
            <Text style={styles.replyUser}>
              Replying to{' '}
              {isMessageFromSelf(replyMessage)
                ? 'yourself'
                : chat.user.profile.name.split(' ')[0]}
            </Text>
            <Text style={styles.replyMessage}>
              {replyMessage.attachments && replyMessage.attachments.length > 0
                ? '[Media] 🖼️'
                : truncateChatPreview(replyMessage.text, 40)}
            </Text>
          </View>
          <View>
            <TouchableOpacity onPress={clearReplyMessage}>
              <ReplyCloseIcon />
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}

      <View style={styles.inputContainer}>
        <View
          style={[
            styles.inputTextContainer,
            {
              backgroundColor: chat.isMare
                ? COLORS.secondary2
                : COLORS.primary1,
            },
          ]}>
          <TextInput
            ref={inputRef}
            keyboardAppearance={'light'}
            style={styles.textInput}
            multiline={true}
            onChangeText={text => setInputText(text)}
            value={inputText}
            placeholder="Type a message.."
            textAlignVertical="center"
            placeholderTextColor={'#ffffff'}
            maxLength={255}
            selectionColor={chat.isMare ? COLORS.primary1 : COLORS.secondary2}
          />
          <TouchableOpacity
            onPress={() => chat.handleImageUpload(true)}
            style={{paddingRight: 16}}>
            <CameraIcon />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => chat.handleImageUpload(false)}
            style={{paddingRight: 16}}>
            <ImagesIcon />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          disabled={!inputText}
          style={styles.buttonContainer}
          onPress={() => {
            chat.handleSendMessage(inputText.trim()); // Pass message to callback
            setInputText(''); // Clear input
          }}>
          <SendIcon isMare={chat.isMare} disabled={!inputText} />
        </TouchableOpacity>
      </View>
    </View>
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
    zIndex: 10000,
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

export default MessageInput;
