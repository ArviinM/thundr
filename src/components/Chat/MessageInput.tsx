import React, {useState} from 'react';
import {
  Platform,
  StyleSheet,
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

const MessageInput = () => {
  const chat = useChatContext();
  const [inputText, setInputText] = useState<string>('');

  return (
    <View style={styles.inputContainer}>
      <View
        style={[
          styles.inputTextContainer,
          {
            backgroundColor: chat.isMare ? COLORS.secondary2 : COLORS.primary1,
          },
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

export default MessageInput;
