// React modules
import React, {useState} from 'react';
import {View} from 'react-native';

// Third party libraries
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';

// Components
import ScreenContainer from '../../../composition/ScreenContainer/ScreenContainer';
import Button from '../../../components/Button/Button';
import Separator from '../../../components/Separator/Separator';
import Image from '../../../components/Image/Image';
import Text from '../../../components/Text/Text';
import TextInput from '../../../composition/TextInput/TextInput';
import Spinner from '../../../components/Spinner/Spinner';

// Ducks
import {START_PASSWORD_VALIDATION} from '../../../ducks/MobileEmail/actionTypes';

// Utils
import {MOBILE_INPUT_URI} from '../../../utils/images';
import {isIosDevice, scale, verticalScale} from '../../../utils/commons';

const CreatePasswordScreen = () => {
  const dispatch = useDispatch();
  const {loading} = useSelector(state => state.mobileEmail);
  const [isPassword1Visible, setPassword1Visible] = useState(true);
  const [isPassword2Visible, setPassword2Visible] = useState(true);

  const validationSchema = yup.object().shape({
    password: yup.string().required('Password is required'),
    password2: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Re-type Password is required'),
  });

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{flexGrow: 1}}
      enableOnAndroid
      bounces={false}
      keyboardShouldPersistTaps="always">
      <ScreenContainer customStyle={{justifyContent: 'flex-start'}}>
        {loading && <Spinner visible={true} />}
        <View style={{top: verticalScale(80), alignItems: 'center'}}>
          <Image
            source={MOBILE_INPUT_URI.CREATE_PASSWORD_ICON}
            width={80}
            height={100}
          />
          <Separator space={20} />
          <Text
            color="#E33051"
            weight={700}
            fontFamily="Montserrat-Regular"
            size={scale(13)}>
            Create Password
          </Text>
          <Text
            color="#59595B"
            weight={700}
            fontFamily="Montserrat-Regular"
            size={scale(11)}
            customStyle={{textAlign: 'center'}}>
            Password must contain at least 8 characters
          </Text>
          <Text
            color="#59595B"
            fontFamily="Montserrat-Regular"
            size={scale(11)}
            customStyle={{paddingHorizontal: scale(60), textAlign: 'center'}}>
            With at least 1 uppercase character, 1 digit, and 1 special symbol
            {' @!#&^()~{}'}
          </Text>
        </View>
        <Separator space={80} />
        <Formik
          initialValues={{
            password: '',
            password2: '',
          }}
          validationSchema={validationSchema}
          onSubmit={values => handleSubmit(values)}>
          {({handleChange, handleSubmit, values, errors, touched}) => {
            const password = values.password;
            const password2 = values.password2;
            const handleSubmitPasswords = () => {
              handleSubmit();
              if (validationSchema.isValidSync(values)) {
                dispatch({
                  type: START_PASSWORD_VALIDATION,
                  payload: {password},
                });
              }
            };
            return (
              <>
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
                    onChangeText={handleChange('password')}
                    value={values.password}
                    errors={errors.password}
                    touched={touched.password}
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
                    placeholder="Re-type password"
                    onChangeText={handleChange('password2')}
                    value={values.password2}
                    errors={errors.password2}
                    touched={touched.password2}
                  />
                </View>
                <Button
                  title="Continue"
                  disabled={!validationSchema.isValidSync(values)}
                  primary
                  textStyle={{weight: 400}}
                  style={{
                    top: verticalScale(20),
                    height: verticalScale(30),
                    width: scale(150),
                  }}
                  onPress={handleSubmitPasswords}
                />
              </>
            );
          }}
        </Formik>
        <View
          style={{
            top: verticalScale(130),
            paddingHorizontal: scale(80),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={MOBILE_INPUT_URI.LOCK_ICON} height={20} width={20} />
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              size={scale(10)}
              customStyle={{
                textAlign: 'center',
                color: '#59595B',
                fontFamily: 'Montserrat-Regular',
              }}>
              Never share your password.
            </Text>
          </View>
        </View>
      </ScreenContainer>
    </KeyboardAwareScrollView>
  );
};

export default CreatePasswordScreen;
