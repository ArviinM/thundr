// React modules
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

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
import TextInput from '../../../composition/TextInput/TextInput';

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
      contentContainerStyle={styles.scrollView}
      enableOnAndroid
      bounces={false}
      keyboardShouldPersistTaps="always">
      <ScreenContainer customStyle={styles.screenContainer}>
        {(loading || ssoLoading) && <Spinner visible={true} />}
        <View style={styles.content}>
          <View style={styles.viewContainer}>
            <Image
              source={MOBILE_INPUT_URI.MOBILE_ICON}
              width={80}
              height={100}
            />
            <Separator space={20} />
            <Text
              color="#E33051"
              weight={700}
              size={scale(13)}
              fontFamily="Montserrat-Regular">
              Enter your Mobile Number
            </Text>
            {/*<Text*/}
            {/*  color="#59595B"*/}
            {/*  size={scale(12)}*/}
            {/*  fontFamily="Montserrat-Regular"*/}
            {/*  customStyle={{paddingHorizontal: scale(30), textAlign: 'center'}}>*/}
            {/*  Enter your mobile number. We will send you an OTP for verification.*/}
            {/*</Text>*/}
            <TextInput
              inputStyle={styles.textInput}
              showLeftContent
              placeholder="XXX XXX XXXX"
              maxLength={10}
              numeric
              value={mobileNumber}
              onChangeText={text => setMobileNumber(text)}
            />
          </View>
          <Button
            title="Continue"
            disabled={mobileNumber.length !== 10}
            primary
            textStyle={{weight: 400}}
            style={styles.button}
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
        </View>
        <View style={styles.footerContainer}>
          <Image source={MOBILE_INPUT_URI.LOCK_ICON} height={20} width={20} />
          <View style={styles.footerViewContainer}>
            <Text
              size={scale(10)}
              fontFamily="Montserrat-Regular"
              color="#59595B"
              customStyle={styles.textCenter}>
              We never share this with anyone and it won’t appear on your
              profile.
            </Text>
          </View>
        </View>
      </ScreenContainer>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {flexGrow: 1},
  screenContainer: {justifyContent: 'flex-start'},
  content: {
    flex: 1,
    alignItems: 'center',
  },
  footerContainer: {
    bottom: verticalScale(50),
    paddingHorizontal: scale(isIosDevice() ? 80 : 65),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCenter: {textAlign: 'center'},
  textInput: {
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#fff',
    width: scale(230),
    height: verticalScale(35),
  },
  button: {
    top: verticalScale(150),
    height: verticalScale(40),
    width: scale(150),
  },
  viewContainer: {top: verticalScale(120), alignItems: 'center'},
});

export default MobileValidationScreen;
