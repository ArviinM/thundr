import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../constants/commons.ts';

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
        {/*<TouchableOpacity*/}
        {/*  onPress={() => openImageLibrary(false)}*/}
        {/*  style={{paddingRight: 6}}>*/}
        {/*  <Image*/}
        {/*    source={MESSAGES_ASSET_URI.GALLERY_ICON}*/}
        {/*    height={25}*/}
        {/*    width={25}*/}
        {/*  />*/}
        {/*</TouchableOpacity>*/}
      </View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => console.log('handling send')}>
        {/*<Image*/}
        {/*  source={*/}
        {/*    isMare*/}
        {/*      ? MESSAGES_ASSET_URI.MARE_SEND_ICON*/}
        {/*      : MESSAGES_ASSET_URI.SEND_ICON*/}
        {/*  }*/}
        {/*  height={45}*/}
        {/*  width={45}*/}
        {/*/>*/}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderRadius: 25,
    width: '85%',
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
