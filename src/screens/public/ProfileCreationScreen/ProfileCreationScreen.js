// React modules
import React, {useState, useRef} from 'react';
import {TouchableOpacity, View} from 'react-native';

// Third party libraries
import {Formik} from 'formik';
import * as yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

// Components
import TextInput from '../../../composition/TextInput/TextInput';
import Text from '../../../components/Text/Text';
import Separator from '../../../components/Separator/Separator';
import Button from '../../../components/Button/Button';
import {
  capitalizeFirstLetter,
  isIosDevice,
  listOfCountries,
  scale,
  verticalScale,
} from '../../../utils/commons';
import Modal from '../../../composition/Modal/Modal';
import {Overlay} from 'react-native-elements';

const ProfileCreationScreen = () => {
  const navigation = useNavigation();
  const calendarRef = useRef(null);
  const [gender, setGender] = useState(null);
  const [country, setCountry] = useState(null);
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(true);
  const [isPasswordVisible2, setPasswordVisible2] = useState(true);

  const validationSchema = yup.object().shape({
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required'),
    password2: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    mobile: yup
      .string()
      .matches(/^\d{11}$/, 'Mobile number must be 11 digits')
      .required('Mobile is required'),
  });

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        password2: '',
        firstName: '',
        lastName: '',
        mobile: '',
      }}
      validationSchema={validationSchema}
      onSubmit={values => handleSubmit(values)}>
      {({handleChange, handleSubmit, values, errors, touched}) => {
        const handleSubmitFunction = () => {
          handleSubmit();
          if (!errors.length && gender && country && selectedDate !== '') {
            navigation.navigate('Dashboard');
          } else {
            setModalVisible(true);
          }
        };
        return (
          <>
            {isModalVisible && (
              <Modal
                modalMessage="Please populate all fields"
                handleCloseModal={() => setModalVisible(false)}
              />
            )}
            <View
              style={{
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#0D5176',
              }}>
              <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                bounces={false}
                contentContainerStyle={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Separator space={10} />
                <Text
                  size={26}
                  color="#fff"
                  customStyle={{
                    paddingHorizontal: isIosDevice() ? 0 : 20,
                    textAlign: 'center',
                  }}>
                  Provide your personal details
                </Text>
                <Separator space={15} />
                <TextInput
                  label="Email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  errors={capitalizeFirstLetter(errors.email)}
                  touched={touched.email}
                />
                <Separator space={15} />
                <TextInput
                  label="Password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  errors={errors.password}
                  touched={touched.password}
                  secureTextEntry={isPasswordVisible}
                  hasIcon
                  onPress={() => setPasswordVisible(!isPasswordVisible)}
                />
                <Separator space={15} />
                <TextInput
                  label="Re-type password"
                  value={values.password2}
                  onChangeText={handleChange('password2')}
                  errors={errors.password2}
                  touched={touched.password2}
                  secureTextEntry={isPasswordVisible2}
                  hasIcon
                  onPress={() => setPasswordVisible2(!isPasswordVisible2)}
                />
                <Separator space={15} />
                <TextInput
                  label="First Name"
                  value={values.firstName}
                  onChangeText={handleChange('firstName')}
                  errors={errors.firstName}
                  touched={touched.firstName}
                />
                <Separator space={15} />
                <TextInput
                  label="Last Name"
                  value={values.lastName}
                  onChangeText={handleChange('lastName')}
                  errors={errors.lastName}
                  touched={touched.lastName}
                />
                <Separator space={20} />
                <TouchableOpacity onPress={() => setCalendarOpen(true)}>
                  <View
                    style={{
                      borderColor: '#fff',
                      borderWidth: 1,
                      height: verticalScale(40),
                      width: scale(290),
                      borderRadius: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text color="#fff" weight="700" size={14}>
                      {selectedDate
                        ? moment(selectedDate).format('MMMM D, YYYY')
                        : 'Enter your Birthday'}
                    </Text>
                  </View>
                </TouchableOpacity>
                {isCalendarOpen && (
                  <Overlay onBackdropPress={() => setCalendarOpen(false)}>
                    <Calendar
                      ref={calendarRef}
                      onDayPress={day => {
                        setSelectedDate(day.dateString);
                        setCalendarOpen(false);
                      }}
                      markedDates={{
                        [selectedDate]: {
                          selectedDate: true,
                          disableTouchEvent: true,
                          selectedDotColor: 'orange',
                        },
                      }}
                      style={{
                        height: 350,
                        width: 350,
                      }}
                    />
                  </Overlay>
                )}
                <Separator space={20} />
                <SelectDropdown
                  data={['Male', 'Female', 'Others']}
                  onSelect={(selectedItem, index) => {
                    setGender(selectedItem);
                  }}
                  defaultButtonText="Choose your gender"
                  buttonStyle={{
                    backgroundColor: 'transparent',
                    flex: 1,
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: '#fff',
                    width: scale(290),
                  }}
                  buttonTextStyle={{
                    fontWeight: '700',
                    fontSize: scale(12),
                    color: '#fff',
                  }}
                  dropdownIconPosition="right"
                />
                <Separator space={20} />
                <SelectDropdown
                  data={listOfCountries}
                  onSelect={(selectedItem, index) => {
                    setCountry(selectedItem);
                  }}
                  defaultButtonText="Choose your country"
                  buttonStyle={{
                    backgroundColor: 'transparent',
                    flex: 1,
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: '#fff',
                    width: scale(290),
                  }}
                  buttonTextStyle={{
                    fontWeight: '700',
                    fontSize: scale(12),
                    color: '#fff',
                  }}
                  dropdownIconPosition="right"
                />
                <Separator space={15} />
                <TextInput
                  label="Mobile Number"
                  value={values.mobile}
                  onChangeText={handleChange('mobile')}
                  errors={errors.mobile}
                  touched={touched.mobile}
                  maxLength={11}
                  numeric
                />
                <Separator space={30} />
                <Button title="Register" onPress={handleSubmitFunction} />
                <Separator space={30} />
              </KeyboardAwareScrollView>
            </View>
          </>
        );
      }}
    </Formik>
  );
};

export default ProfileCreationScreen;
