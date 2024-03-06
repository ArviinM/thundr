// React modules
import React from 'react';
import {StyleSheet, View} from 'react-native';

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
    email: yup
      .string()
      .email('Please enter a valid email address')
      .required('Email is required'),
  });

  const handleSubmit = values => {
    dispatch({
      type: START_EMAIL_VALIDATION,
      payload: {
        email: values.email,
      },
    });
  };
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.scrollView}
      bounces={false}
      keyboardShouldPersistTaps="always">
      <ScreenContainer customStyle={styles.screenContainer}>
        {loading && <Spinner visible={true} />}
        <View style={styles.content}>
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
            customStyle={styles.textContent}>
            Enter your email address to give added security to your account.
          </Text>
          <Formik
            initialValues={{
              email: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            {({handleChange, values, errors, touched}) => {
              const handleSubmitEmail = () => {
                handleSubmit(values);
              };
              return (
                <>
                  <View>
                    <TextInput
                      inputStyle={styles.textInput}
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
                      style={styles.button}
                      onPress={handleSubmitEmail}
                    />
                  </View>
                </>
              );
            }}
          </Formik>
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
    top: verticalScale(80),
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
  textCenter: {
    textAlign: 'center',
  },
  button: {
    top: verticalScale(30),
    height: verticalScale(40),
    width: scale(150),
  },
  textInput: {
    alignItems: 'center',
    borderRadius: 30,
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(20),
    backgroundColor: '#fff',
    width: scale(230),
  },
  textContent: {paddingHorizontal: scale(70), textAlign: 'center'},
});

export default EmailValidationScreen;
