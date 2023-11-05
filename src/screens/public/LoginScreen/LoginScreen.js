// React modules
import React, {useState} from 'react';
import {View} from 'react-native';

// Third party libraries
import {useNavigation} from '@react-navigation/native';
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
import {START_LOGIN} from '../../../ducks/Login/actionTypes';
import Spinner from '../../../components/Spinner/Spinner';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const {loading} = useSelector(state => state.login);
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

  return (
    <>
      {loading && <Spinner visible={true} />}
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
          <Formik
            initialValues={{
              emailOrMobile: '',
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
                      placeholder="Email / Mobile Number"
                      value={values.emailOrMobile}
                      onChangeText={handleChange('emailOrMobile')}
                      errors={capitalizeFirstLetter(
                        errors.emailOrMobile
                          ? 'Email or Mobile Number is a required field'
                          : '',
                      )}
                      touched={touched.emailOrMobile}
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
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

export default LoginScreen;
