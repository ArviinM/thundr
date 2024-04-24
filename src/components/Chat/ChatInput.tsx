import React, {useState} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../constants/commons.ts';
import {SendIcon} from '../../assets/images/chat/SendIcon.tsx';
import {ImagesIcon} from '../../assets/images/chat/ImagesIcon.tsx';

const ChatInput = ({isMare}: {isMare: boolean}) => {
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
        <TouchableOpacity
          onPress={() => console.log('add me the rn image picker :< ')}
          style={{paddingRight: 16}}>
          <ImagesIcon />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        disabled={!inputText}
        style={styles.buttonContainer}
        onPress={() => console.log('handling send')}>
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
