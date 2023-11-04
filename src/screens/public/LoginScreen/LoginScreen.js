// React modules
import React, {useState} from 'react';
import {Linking, TextInput, TouchableOpacity, View} from 'react-native';

// Third party libraries
import {Link, useNavigation} from '@react-navigation/native';

// Components
import Separator from '../../../components/Separator/Separator';
import {LOGIN_ASSET_URI} from '../../../utils/images';
import Image from '../../../components/Image/Image';
import Text from '../../../components/Text/Text';
import {isIosDevice, scale, verticalScale} from '../../../utils/commons';
import Button from '../../../components/Button/Button';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <View
        style={{
          flex: 1,
          alignContent: 'center',
          backgroundColor: '#F2CECD',
        }}>
        <Separator space={45} />
        <Image source={LOGIN_ASSET_URI.THUNDR_LOGO} height={210} width={350} />
        <Separator space={15} />
        <Text color="#E33051" size={20} customStyle={{textAlign: 'center'}}>
          LOG IN
        </Text>
        <View style={{top: verticalScale(50)}}>
          <Button
            title="Continue"
            primary
            textStyle={{weight: 400}}
            style={{
              top: verticalScale(125),
              height: verticalScale(30),
              width: scale(150),
            }}
            onPress={() => navigation.navigate('Dashboard')}
          />
        </View>
        <View
          style={{
            top: verticalScale(20),
            alignSelf: 'center',
            borderRadius: 30,
            paddingVertical: verticalScale(10),
            paddingHorizontal: scale(20),
            backgroundColor: '#fff',
            width: scale(230),
            height: verticalScale(35),
          }}>
          <TextInput
            style={{
              flex: 1,
              top: verticalScale(1),
              color: '#B1B3B5',
            }}
            placeholder="Email / Mobile Number"
            value={username}
            onChangeText={text => setUsername(text)}
          />
        </View>
        <View
          style={{
            top: verticalScale(30),
            alignSelf: 'center',
            borderRadius: 30,
            paddingVertical: verticalScale(10),
            paddingHorizontal: scale(20),
            backgroundColor: '#fff',
            width: scale(230),
            height: verticalScale(35),
          }}>
          <TextInput
            style={{
              flex: 1,
              top: verticalScale(1),
              color: '#B1B3B5',
            }}
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
          />
        </View>
      </View>
    </>
  );
};

export default LoginScreen;
