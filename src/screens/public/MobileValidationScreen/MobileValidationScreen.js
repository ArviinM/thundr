// React modules
import React, {useState} from 'react';
import {View, TextInput} from 'react-native';

// Third party libraries
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';

// Components
import ScreenContainer from '../../../composition/ScreenContainer/ScreenContainer';
import Button from '../../../components/Button/Button';
import Separator from '../../../components/Separator/Separator';
import Image from '../../../components/Image/Image';
import Text from '../../../components/Text/Text';
import Spinner from '../../../components/Spinner/Spinner';

// Ducks
import {START_SSO_MOBILE_VALIDATION} from '../../../ducks/SSOValidation/actionTypes';
import {START_MOBILE_VALIDATION} from '../../../ducks/MobileEmail/actionTypes';

// Utils
import {MOBILE_INPUT_URI} from '../../../utils/images';
import {isIosDevice, scale, verticalScale} from '../../../utils/commons';

const MobileValidationScreen = () => {
  const dispatch = useDispatch();
  const {loading} = useSelector(state => state.mobileEmail);
  const {loginViaSSO, loading: ssoLoading} = useSelector(
    state => state.ssoValidation,
  );
  const [mobileNumber, setMobileNumber] = useState('');
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{flexGrow: 1}}
      enableOnAndroid
      bounces={false}
      keyboardShouldPersistTaps="always">
      <ScreenContainer customStyle={{justifyContent: 'flex-start'}}>
        {(loading || ssoLoading) && <Spinner visible={true} />}
        <View style={{top: verticalScale(120), alignItems: 'center'}}>
          <Image
            source={MOBILE_INPUT_URI.MOBILE_ICON}
            width={80}
            height={100}
          />
          <Separator space={20} />
          <Text color="#E33051" weight={700}>
            Enter your Mobile Number
          </Text>
          {/* <Text
            color="#59595B"
            customStyle={{paddingHorizontal: scale(70), textAlign: 'center'}}>
            Enter your mobile number. We will send you an OTP for verification.
          </Text> */}
          <View
            style={{
              top: verticalScale(20),
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 30,
              paddingVertical: verticalScale(isIosDevice() ? 8 : 3),
              paddingHorizontal: scale(20),
              backgroundColor: '#fff',
              width: scale(230),
              height: verticalScale(isIosDevice() ? 30 : 40),
            }}>
            <Text color="#E33051" weight={700}>
              +63
            </Text>
            <View
              style={{
                width: 1,
                height: verticalScale(15),
                backgroundColor: '#B1B3B5',
                marginHorizontal: scale(6),
              }}
            />
            <TextInput
              style={{
                flex: 1,
                top: verticalScale(isIosDevice() ? 1 : 2),
                color: 'black',
              }}
              placeholder="XXX XXX XXXX"
              keyboardType="numeric"
              maxLength={10}
              value={mobileNumber}
              onChangeText={text => setMobileNumber(text)}
            />
          </View>
        </View>
        <Button
          title="Continue"
          disabled={!mobileNumber.length}
          primary
          textStyle={{weight: 400}}
          style={{
            top: verticalScale(170),
            height: verticalScale(isIosDevice() ? 30 : 40),
            width: scale(150),
          }}
          onPress={() => {
            !loginViaSSO
              ? dispatch({
                  type: START_MOBILE_VALIDATION,
                  payload: {mobileNumber},
                })
              : dispatch({
                  type: START_SSO_MOBILE_VALIDATION,
                  payload: {mobileNumber},
                });
          }}
        />
        <View
          style={{
            top: verticalScale(270),
            paddingHorizontal: scale(isIosDevice() ? 80 : 65),
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Image
            source={MOBILE_INPUT_URI.LOCK_ICON}
            height={20}
            width={20}
            customStyle={{
              marginRight: scale(10),
              top: verticalScale(isIosDevice() ? 3 : 7),
            }}
          />
          <Text color="#59595B">
            We never share this with anyone and it won’t appear on your profile.
          </Text>
        </View>
      </ScreenContainer>
    </KeyboardAwareScrollView>
  );
};

export default MobileValidationScreen;
