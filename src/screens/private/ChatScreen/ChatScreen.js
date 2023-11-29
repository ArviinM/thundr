// React modules
import React, {useState} from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import {scale, verticalScale} from '../../../utils/commons';
import Text from '../../../components/Text/Text';
import TextInput from '../../../composition/TextInput/TextInput';

// Third party libraries

// Utils

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim() !== '') {
      setMessages([...messages, {id: messages.length, text: inputText}]);
      setInputText('');
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#f4f4f4'}}>
      <ScrollView style={{flex: 1, padding: 10}}>
        {messages.map(message => (
          <View
            key={message.id}
            style={{
              alignSelf: 'flex-end',
              backgroundColor: '#E33C59',
              padding: scale(20),
              borderRadius: 8,
              marginBottom: 10,
              maxWidth: '80%',
            }}>
            <Text color="#fff" fontFamil="Montserrat-Regular">
              {message.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: scale(8),
          bottom: verticalScale(20),
        }}>
        <TextInput
          inputStyle={{
            borderWidth: 1,
            borderRadius: 5,
            padding: 8,
            backgroundColor: 'white',
          }}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={text => setInputText(text)}
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity
          style={{
            position: 'absolute',
            left: scale(270),
            bottom: verticalScale(16),
            padding: 10,
            backgroundColor: '#E33C59',
            borderRadius: 20,
          }}
          onPress={handleSend}>
          <Text style={{color: 'white'}}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;
