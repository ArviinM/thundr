import React, {useState} from 'react';
import ScreenContainer from '../../../composition/ScreenContainer/ScreenContainer';
import Button from '../../../components/Button/Button';
import Separator from '../../../components/Separator/Separator';
import {useNavigation} from '@react-navigation/native';
import Image from '../../../components/Image/Image';
import {MOBILE_INPUT_URI} from '../../../utils/images';
import Text from '../../../components/Text/Text';
import {View, TextInput} from 'react-native';
import {scale, verticalScale} from '../../../utils/commons';

const CreatePasswordScreen = () => {
  const navigation = useNavigation();
  const [mobileNumber, setMobileNumber] = useState('');
  return (
    <ScreenContainer customStyle={{justifyContent: 'flex-start'}}>
      <View style={{top: verticalScale(80), alignItems: 'center'}}>
        <Image
          source={MOBILE_INPUT_URI.CREATE_PASSWORD_ICON}
          width={80}
          height={100}
        />
        <Separator space={20} />
        <Text color="#E33051">Create Password</Text>
        <View>
          <View
            style={{
              top: verticalScale(20),
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 30,
              paddingVertical: verticalScale(10),
              paddingHorizontal: scale(20),
              backgroundColor: '#fff',
              width: scale(230),
            }}>
            <TextInput
              style={{
                flex: 1,
                top: verticalScale(1),
                color: '#B1B3B5',
              }}
              placeholder="Password"
              value={mobileNumber}
              onChangeText={text => setMobileNumber(text)}
            />
          </View>
          <Separator space={25} />
        </View>
      </View>
      <View
        style={{
          top: verticalScale(260),
          paddingHorizontal: scale(80),
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Image
          source={MOBILE_INPUT_URI.LOCK_ICON}
          height={20}
          width={20}
          customStyle={{marginRight: scale(10), top: verticalScale(-3)}}
        />
        <Text color="#59595B">Never share your password.</Text>
      </View>
      <View>
        <Button
          title="Continue"
          primary
          textStyle={{weight: 400}}
          style={{
            top: verticalScale(130),
            height: verticalScale(30),
            width: scale(150),
          }}
          onPress={() => navigation.navigate('EmailVerificationScreen')}
        />
      </View>
    </ScreenContainer>
  );
};

export default CreatePasswordScreen;
