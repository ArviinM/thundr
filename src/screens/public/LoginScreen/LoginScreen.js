// React modules
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';

// Third party libraries
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import * as yup from 'yup';

// Components
import Separator from '../../../components/Separator/Separator';
import Button from '../../../components/Button/Button';
import TextInput from '../../../composition/TextInput/TextInput';
import Image from '../../../components/Image/Image';
import Text from '../../../components/Text/Text';

// Utils
import {LOGIN_ASSET_URI} from '../../../utils/images';
import {
  capitalizeFirstLetter,
  isIosDevice,
  scale,
  verticalScale,
} from '../../../utils/commons';
import {useDispatch, useSelector} from 'react-redux';
import {
  START_LOGIN,
  START_LOGIN_VIA_REFRESH_TOKEN,
} from '../../../ducks/Login/actionTypes';
import Spinner from '../../../components/Spinner/Spinner';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const {loading} = useSelector(state => state.login);
  const {phoneNumber} = useSelector(state => state.mobileEmail);
  const {refreshToken, customerPhoto, customerName} = useSelector(
    state => state.onboarding,
  );
  const [isPasswordVisible, setPasswordVisible] = useState(true);

  const validationSchema = yup.object().shape({
    emailOrMobile: yup.string().required(),
    password: yup.string().required(),
  });

  const handleSubmit = values => {
    dispatch({
      type: START_LOGIN,
      payload: {
        emailOrMobile: values.emailOrMobile,
        password: values.password,
      },
    });
  };

  const continueWithAccountButton = () => {
    return (
      <TouchableOpacity
        onPress={() =>
          dispatch({
            type: START_LOGIN_VIA_REFRESH_TOKEN,
            payload: {refreshToken: refreshToken},
          })
        }
        style={{alignSelf: 'center', marginTop: verticalScale(30)}}>
        <View
          style={{
            backgroundColor: '#fff',
            height: verticalScale(30),
            width: scale(230),
            justifyContent: 'center',
            borderRadius: 20,
            flexDirection: 'row',
          }}>
          <Image
            source={{uri: customerPhoto}}
            height={30}
            width={25}
            customStyle={{marginRight: scale(6)}}
          />
          <Text
            color="#E33051"
            weight={700}
            customStyle={{
              textAlign: 'center',
              top: verticalScale(isIosDevice() ? 8 : 4),
            }}>
            {`Continue as ${customerName}`}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const inputFields = () => {
    return (
      <Formik
        initialValues={{
          emailOrMobile: phoneNumber ? phoneNumber : '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={values => handleSubmit(values)}>
        {({handleChange, handleSubmit, values, errors, touched}) => {
          return (
            <>
              <View style={{justifyContent: 'center', alignSelf: 'center'}}>
                <TextInput
                  inputStyle={{
                    alignItems: 'center',
                    borderRadius: 30,
                    backgroundColor: '#fff',
                    width: scale(230),
                    height: verticalScale(35),
                  }}
                  placeholder="XXX XXX XXXX"
                  value={values.emailOrMobile}
                  onChangeText={handleChange('emailOrMobile')}
                  errors={capitalizeFirstLetter(
                    errors.emailOrMobile
                      ? 'Mobile Number is a required field'
                      : '',
                  )}
                  touched={touched.emailOrMobile}
                  showLeftContent={true}
                  maxLength={10}
                  editable={false}
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
                  secureTextEntry={isPasswordVisible}
                  hasIcon
                  onPress={() => setPasswordVisible(!isPasswordVisible)}
                  placeholder="Password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  errors={capitalizeFirstLetter(errors.password)}
                  touched={touched.password}
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
                  onPress={handleSubmit}
                />
              </View>
            </>
          );
        }}
      </Formik>
    );
  };

  return (
    <>
      {loading && <Spinner visible={true} />}
      <KeyboardAwareScrollView
        bounces={false}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{flexGrow: 1}}
        enableOnAndroid={true}>
        <View
          style={{
            alignContent: 'center',
            backgroundColor: '#F2CECD',
          }}>
          <Separator space={70} />
          <Image
            source={LOGIN_ASSET_URI.THUNDR_LOGO}
            height={210}
            width={350}
          />
          <Separator space={15} />
          <Text
            color="#E33051"
            size={20}
            weight={700}
            customStyle={{textAlign: 'center'}}>
            LOG IN
          </Text>
          {refreshToken ? continueWithAccountButton() : inputFields()}
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

export default LoginScreen;
