import React, {useEffect, useRef, useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';

import {NavigationProp, useNavigation} from '@react-navigation/native';

import GradientButton from '../../../components/shared/GradientButton.tsx';
import StepProgressBar from '../../../components/shared/StepProgressBar.tsx';

import {IMAGES} from '../../../constants/images.ts';
import {RootNavigationParams} from '../../../constants/navigator.ts';

import {yupResolver} from '@hookform/resolvers/yup';
import {
  KeyboardAwareScrollView,
  KeyboardStickyView,
} from 'react-native-keyboard-controller';
import {profileCreationStyles} from './styles.tsx';
import CustomDropdown from '../../../components/shared/Dropdown.tsx';
import {
  generateDayData,
  generateMonthData,
  generateYearData,
} from '../../../utils/utils.ts';
import useCustomerProfileStore from '../../../store/profileStore.ts';

const CustomerBirthday = () => {
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();
  const textInputRef = useRef<TextInput>(null);

  const [loading, isLoading] = useState(false);
  const monthData = generateMonthData();
  const dayData = generateDayData();
  const yearData = generateYearData();

  const updateCustomerProfile = useCustomerProfileStore(
    state => state.updateCustomerProfile,
  );

  const schema = yup.object().shape({
    month: yup.string().required('Nako mars, we need your birth month po!'),
    day: yup.string().required('Nako mars, we need your birth day po!'),
    year: yup.string().required('Nako mars, we need your birth year po!'),
  });

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  }, []);

  const onSubmit = async (data: {month: string; day: string; year: string}) => {
    try {
      await schema.validate(data);
      isLoading(true);
      console.log(data);

      updateCustomerProfile({
        birthday: `${data.year}-${data.month}-${data.day}`,
      });

      isLoading(false);
      navigation.navigate('CustomerGender');
    } catch (error) {
      // Handle validation errors
      if (error instanceof yup.ValidationError) {
        console.error(error.message);
      }
    }
  };

  return (
    <SafeAreaView
      edges={['top', 'bottom']}
      style={profileCreationStyles.container}>
      <StepProgressBar currentStep={2} totalSteps={10} />
      <KeyboardAwareScrollView
        bottomOffset={220}
        style={profileCreationStyles.flex}>
        <View style={profileCreationStyles.container}>
          <View style={profileCreationStyles.backButtonContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={profileCreationStyles.backButton}>
              <Image
                source={IMAGES.back}
                style={profileCreationStyles.backImage}
              />
            </TouchableOpacity>
          </View>
          <View style={profileCreationStyles.titleContainer}>
            <Text style={profileCreationStyles.textTitle}>
              Enter your birthday
            </Text>

            <View style={profileCreationStyles.dropdownContainer}>
              <View style={profileCreationStyles.dropdownSection}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({field: {onChange, value}}) => (
                    <CustomDropdown
                      data={monthData}
                      placeholder="MM"
                      value={value}
                      onChange={item => {
                        onChange(item.value);
                      }}
                    />
                  )}
                  name="month"
                />
                {errors.month && (
                  <Text style={profileCreationStyles.errorText}>
                    {errors.month.message}
                  </Text>
                )}
              </View>
              <View style={profileCreationStyles.dropdownSection}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({field: {onChange, value}}) => (
                    <CustomDropdown
                      data={dayData}
                      placeholder="DD"
                      value={value}
                      onChange={item => {
                        onChange(item.value);
                      }}
                    />
                  )}
                  name="day"
                />
                {errors.day && (
                  <Text style={profileCreationStyles.errorText}>
                    {errors.day.message}
                  </Text>
                )}
              </View>
              <View style={profileCreationStyles.dropdownSection}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({field: {onChange, value}}) => (
                    <CustomDropdown
                      data={yearData}
                      placeholder="YYYY"
                      value={value}
                      onChange={item => {
                        onChange(item.value);
                      }}
                    />
                  )}
                  name="year"
                />
                {errors.year && (
                  <Text style={profileCreationStyles.errorText}>
                    {errors.year.message}
                  </Text>
                )}
              </View>
            </View>
            <View style={profileCreationStyles.bodyContainer}>
              <Text style={profileCreationStyles.textBody}>
                Oh bongga. Welcome to Thundr! ⚡️
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <KeyboardStickyView offset={{closed: -20, opened: 0}}>
        <View style={profileCreationStyles.buttonContainer}>
          <GradientButton
            onPress={handleSubmit(onSubmit)}
            text="Next"
            loading={loading}
            disabled={!isValid}
            buttonStyle={profileCreationStyles.buttonStyle}
            textStyle={profileCreationStyles.buttonTextStyle}
          />
        </View>
      </KeyboardStickyView>
    </SafeAreaView>
  );
};

export default CustomerBirthday;
