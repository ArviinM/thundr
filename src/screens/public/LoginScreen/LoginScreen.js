// React modules
import React, {useState} from 'react';
import {View} from 'react-native';

// Third party libraries
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// Components
import Separator from '../../../components/Separator/Separator';
import Button from '../../../components/Button/Button';
import TextInput from '../../../composition/TextInput/TextInput';
import Image from '../../../components/Image/Image';
import Text from '../../../components/Text/Text';

// Utils
import {LOGIN_ASSET_URI} from '../../../utils/images';
import {isIosDevice, scale, verticalScale} from '../../../utils/commons';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAwareScrollView
      bounces={false}
      contentContainerStyle={{flexGrow: 1}}
      enableOnAndroid={true}>
      <View
        style={{
          alignContent: 'center',
          backgroundColor: '#F2CECD',
        }}>
        <Separator space={70} />
        <Image source={LOGIN_ASSET_URI.THUNDR_LOGO} height={210} width={350} />
        <Separator space={15} />
        <Text
          color="#E33051"
          size={20}
          weight={700}
          customStyle={{textAlign: 'center'}}>
          LOG IN
        </Text>
        <View style={{justifyContent: 'center', alignSelf: 'center'}}>
          <TextInput
            inputStyle={{
              alignItems: 'center',
              borderRadius: 30,
              backgroundColor: '#fff',
              width: scale(230),
              height: verticalScale(35),
            }}
            placeholder="Email / Mobile Number"
            value={username}
            onChangeText={text => setUsername(text)}
          />
          <TextInput
            inputStyle={{
              alignItems: 'center',
              borderRadius: 30,
              backgroundColor: '#fff',
              width: scale(230),
              top: verticalScale(-10),
              height: verticalScale(35),
            }}
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
          />
        </View>
        <View>
          <Button
            title="Continue"
            primary
            textStyle={{weight: 400}}
            style={{
              top: verticalScale(20),
              height: verticalScale(isIosDevice() ? 30 : 40),
              width: scale(150),
            }}
            onPress={() => navigation.navigate('Dashboard')}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
