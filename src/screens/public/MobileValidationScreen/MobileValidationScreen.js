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

const MobileValidationScreen = () => {
  const navigation = useNavigation();
  const [mobileNumber, setMobileNumber] = useState('');
  return (
    <ScreenContainer customStyle={{justifyContent: 'flex-start'}}>
      <View style={{top: verticalScale(120), alignItems: 'center'}}>
        <Image source={MOBILE_INPUT_URI.MOBILE_ICON} width={80} height={100} />
        <Separator space={20} />
        <Text color="#E33051">Register with Mobile Number</Text>
        <Text
          color="#59595B"
          customStyle={{paddingHorizontal: scale(70), textAlign: 'center'}}>
          Enter your mobile number. We will send you an OTP for verification.
        </Text>
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
          <Text color="#E33051">+63</Text>
          <View
            style={{
              width: 1,
              height: verticalScale(15),
              backgroundColor: '#B1B3B5',
              marginHorizontal: scale(6),
            }}></View>
          <TextInput
            style={{
              flex: 1,
              top: verticalScale(1),
              color: '#B1B3B5',
            }}
            placeholder="XXXXXXXXXX"
            maxLength={10}
            value={mobileNumber}
            onChangeText={text => setMobileNumber(text)}
          />
        </View>
      </View>
      <Button
        title="Continue"
        primary
        textStyle={{weight: 400}}
        style={{
          top: verticalScale(180),
          height: verticalScale(30),
          width: scale(150),
        }}
        onPress={() => navigation.navigate('MobileVerificationScreen')}
      />
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
          customStyle={{marginRight: scale(10), top: verticalScale(3)}}
        />
        <Text color="#59595B">
          We never share this with anyone and it won’t appear on your profile.
        </Text>
      </View>
    </ScreenContainer>
  );
};

export default MobileValidationScreen;
