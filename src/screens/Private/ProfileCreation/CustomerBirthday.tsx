import React, {useEffect, useRef, useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import * as yup from 'yup';

import {NavigationProp, useNavigation} from '@react-navigation/native';

import GradientButton from '../../../components/shared/GradientButton.tsx';
import StepProgressBar from '../../../components/shared/StepProgressBar.tsx';

import {IMAGES} from '../../../constants/images.ts';
import {RootNavigationParams} from '../../../constants/navigator.ts';

import {
  KeyboardAwareScrollView,
  KeyboardStickyView,
} from 'react-native-keyboard-controller';
import {profileCreationStyles} from './styles.tsx';
import {minDate, scale} from '../../../utils/utils.ts';
import useCustomerProfileStore from '../../../store/profileStore.ts';
import DatePicker from 'react-native-date-picker';
import {format} from 'date-fns';
import {COLORS} from '../../../constants/commons.ts';

const CustomerBirthday = () => {
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();
  const textInputRef = useRef<TextInput>(null);

  const [loading, isLoading] = useState(false);
  const [date, setDate] = useState(minDate);
  const [open, setOpen] = useState(false);

  const updateCustomerProfile = useCustomerProfileStore(
    state => state.updateCustomerProfile,
  );

  useEffect(() => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  }, []);

  const onSubmit = async () => {
    try {
      if (date) {
        isLoading(true);
        updateCustomerProfile({
          birthday: format(date, 'yyyy-MM-dd'),
        });

        isLoading(false);
        navigation.navigate('CustomerGender');
      }
    } catch (error) {
      // Handle validation errors
      if (error instanceof yup.ValidationError) {
        console.error(error.message);
      }
    }
  };

  return (
    <>
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
                <TouchableOpacity
                  onPress={() => setOpen(true)}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    gap: 6,
                    borderWidth: 1,
                    paddingVertical: scale(13),
                    paddingHorizontal: scale(14),
                    borderRadius: scale(22),
                    flex: 1,
                    borderColor: COLORS.black4,
                  }}>
                  <Text
                    style={{
                      textAlign: 'left',
                      fontSize: scale(14),
                      fontFamily: 'Montserrat-SemiBold',
                      color: COLORS.black,
                    }}>
                    {date && format(date, 'MMMM dd, yyyy')}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={profileCreationStyles.bodyContainer}>
                <Text style={profileCreationStyles.textBody}>
                  Oh bongga. Welcome to Thundr! ⚡️{'\n'}Make sure, you are 20
                  years old and above to join the community.
                </Text>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <KeyboardStickyView offset={{closed: -20, opened: 0}}>
          <View style={profileCreationStyles.buttonContainer}>
            <GradientButton
              onPress={onSubmit}
              text="Next"
              loading={loading}
              disabled={!date}
              buttonStyle={profileCreationStyles.buttonStyle}
              textStyle={profileCreationStyles.buttonTextStyle}
            />
          </View>
        </KeyboardStickyView>
      </SafeAreaView>
      <DatePicker
        modal
        mode="date"
        date={date}
        open={open}
        maximumDate={minDate}
        onConfirm={d => {
          setOpen(false);
          setDate(d);
        }}
        onCancel={() => setOpen(false)}
      />
    </>
  );
};

export default CustomerBirthday;
