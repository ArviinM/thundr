// React modules
import React from 'react';
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
import {START_EMAIL_VALIDATION} from '../../../ducks/MobileEmail/actionTypes';

// Utils
import {MOBILE_INPUT_URI} from '../../../utils/images';
import {isIosDevice, scale, verticalScale} from '../../../utils/commons';

const EmailValidationScreen = () => {
  const dispatch = useDispatch();
  const {loading} = useSelector(state => state.mobileEmail);

  const validationSchema = yup.object().shape({
    email: yup.string().email().required('Email is required'),
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
          <Image source={MOBILE_INPUT_URI.EMAIL_ICON} width={80} height={100} />
          <Separator space={20} />
          <Text
            color="#E33051"
            weight={700}
            fontFamily="Montserrat-Regular"
            size={scale(13)}>
            Add Email
          </Text>
          <Text
            color="#59595B"
            fontFamily="Montserrat-Regular"
            size={scale(12)}
            customStyle={{paddingHorizontal: scale(70), textAlign: 'center'}}>
            Enter your email address to give added security to your account.
          </Text>
          <Formik
            initialValues={{
              email: '',
            }}
            validationSchema={validationSchema}
            onSubmit={values => handleSubmit(values)}>
            {({handleChange, handleSubmit, values, errors, touched}) => {
              const handleSubmitEmail = () => {
                handleSubmit();
                if (validationSchema.isValidSync(values)) {
                  dispatch({
                    type: START_EMAIL_VALIDATION,
                    payload: {
                      email: values.email,
                    },
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
                        paddingVertical: verticalScale(10),
                        paddingHorizontal: scale(20),
                        backgroundColor: '#fff',
                        width: scale(230),
                      }}
                      placeholder=""
                      onChangeText={handleChange('email')}
                      value={values.email}
                      errors={errors.email}
                      touched={touched.email}
                    />
                  </View>
                  <Separator space={20} />
                  <View>
                    <Button
                      disabled={!validationSchema.isValidSync(values)}
                      title="Continue"
                      primary
                      textStyle={{weight: 400}}
                      style={{
                        top: verticalScale(30),
                        height: verticalScale(40),
                        width: scale(150),
                      }}
                      onPress={handleSubmitEmail}
                    />
                  </View>
                </>
              );
            }}
          </Formik>
        </View>
        <View
          style={{
            top: verticalScale(260),
            paddingHorizontal: scale(isIosDevice() ? 80 : 65),
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
              We never share this with anyone and it won’t appear on your
              profile.
            </Text>
          </View>
        </View>
      </ScreenContainer>
    </KeyboardAwareScrollView>
  );
};

export default EmailValidationScreen;
