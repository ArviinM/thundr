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

const ChatInput = ({
  isMare,
  onPressSend,
  onPressImage,
  onPressCamera,
}: {
  isMare: boolean;
  onPressSend: (message: string) => void;
  onPressImage: () => void;
  onPressCamera: () => void;
}) => {
  const [inputText, setInputText] = useState<string>('');

  return (
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
});

export default ChatInput;
