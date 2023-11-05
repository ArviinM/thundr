// React modules
import React, {useState} from 'react';
import {View} from 'react-native';

// Third party libraries
import {useNavigation} from '@react-navigation/native';

// Components
import ScreenContainer from '../../../composition/ScreenContainer/ScreenContainer';
import Button from '../../../components/Button/Button';
import Separator from '../../../components/Separator/Separator';
import Image from '../../../components/Image/Image';
import Text from '../../../components/Text/Text';
import TextInput from '../../../composition/TextInput/TextInput';

// Utils
import {MOBILE_INPUT_URI} from '../../../utils/images';
import {isIosDevice, scale, verticalScale} from '../../../utils/commons';
import {useDispatch, useSelector} from 'react-redux';
import {START_PASSWORD_VALIDATION} from '../../../ducks/MobileEmail/actionTypes';
import Spinner from '../../../components/Spinner/Spinner';

const CreatePasswordScreen = () => {
  const dispatch = useDispatch();
  const {loading} = useSelector(state => state.mobileEmail);
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [isPassword1Visible, setPassword1Visible] = useState(true);
  const [isPassword2Visible, setPassword2Visible] = useState(true);
  return (
    <ScreenContainer customStyle={{justifyContent: 'flex-start'}}>
      {loading && <Spinner visible={true} />}
      <View style={{top: verticalScale(80), alignItems: 'center'}}>
        <Image
          source={MOBILE_INPUT_URI.CREATE_PASSWORD_ICON}
          width={80}
          height={100}
        />
        <Separator space={20} />
        <Text color="#E33051" weight={700}>
          Create Password
        </Text>
      </View>
      <Separator space={80} />
      <View>
        <TextInput
          inputStyle={{
            alignItems: 'center',
            borderRadius: 30,
            paddingVertical: verticalScale(isIosDevice() ? 10 : 8),
            paddingHorizontal: scale(20),
            backgroundColor: '#fff',
            width: scale(230),
            height: verticalScale(35),
          }}
          secureTextEntry={isPassword1Visible}
          hasIcon
          onPress={() => setPassword1Visible(!isPassword1Visible)}
          placeholder="Password"
          fromCreatePassword={true}
          value={password1}
          onChangeText={text => setPassword1(text)}
        />
      </View>
      <Separator space={isIosDevice() ? 10 : 0} />
      <View>
        <TextInput
          inputStyle={{
            alignItems: 'center',
            borderRadius: 30,
            paddingVertical: verticalScale(isIosDevice() ? 10 : 8),
            paddingHorizontal: scale(20),
            backgroundColor: '#fff',
            width: scale(230),
            top: verticalScale(-10),
            height: verticalScale(35),
          }}
          secureTextEntry={isPassword2Visible}
          hasIcon
          onPress={() => setPassword2Visible(!isPassword2Visible)}
          fromCreatePassword2={true}
          placeholder="Re-type Password"
          value={password2}
          onChangeText={text => setPassword2(text)}
        />
      </View>

      <Button
        title="Continue"
        primary
        textStyle={{weight: 400}}
        style={{
          marginTop: verticalScale(20),
          height: verticalScale(isIosDevice() ? 30 : 40),
          width: scale(150),
        }}
        onPress={() =>
          dispatch({type: START_PASSWORD_VALIDATION, payload: {password1}})
        }
      />
      <View
        style={{
          top: verticalScale(150),
          paddingHorizontal: scale(80),
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Image
          source={MOBILE_INPUT_URI.LOCK_ICON}
          height={20}
          width={20}
          customStyle={{
            marginRight: scale(10),
            top: verticalScale(isIosDevice() ? -3 : 0),
          }}
        />
        <Text color="#59595B">Never share your password.</Text>
      </View>
    </ScreenContainer>
  );
};

export default CreatePasswordScreen;
