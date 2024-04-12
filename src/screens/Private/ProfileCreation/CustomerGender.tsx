import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
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
import LetterGradientButton from '../../../components/shared/LetterGradientButton.tsx';
import useCustomerProfileStore from '../../../store/profileStore.ts';
import {convertAbbreviationToWord} from '../../../utils/utils.ts';

const CustomerGender = () => {
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();

  const [loading, isLoading] = useState(false);
  const letters = ['L', 'G', 'B', 'T', 'Q', 'I', 'A', '+'];
  const [selectedLetter, setSelectedLetter] = useState('');

  const schema = yup.object().shape({
    selectedLetter: yup
      .string()
      .required('Nako mars, we need your chosen gender po!'),
  });

  const updateCustomerProfile = useCustomerProfileStore(
    state => state.updateCustomerProfile,
  );

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: {selectedLetter: string}) => {
    try {
      await schema.validate(data);
      isLoading(true);
      const gender = convertAbbreviationToWord(selectedLetter);

      updateCustomerProfile({
        gender: gender,
      });

      isLoading(false);
      navigation.navigate('CustomerRequestAccess');
    } catch (error) {
      // Handle validation errors
      if (error instanceof yup.ValidationError) {
        console.error(error.message);
      }
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView
        edges={['top', 'bottom']}
        style={profileCreationStyles.container}>
        <StepProgressBar currentStep={3} totalSteps={10} />
        <KeyboardAwareScrollView
          bottomOffset={220}
          style={profileCreationStyles.flex}>
          <View style={profileCreationStyles.container}>
            <View style={profileCreationStyles.backButtonContainer}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                disabled={true}
                style={profileCreationStyles.backButton}>
                <Image
                  source={IMAGES.back}
                  style={[profileCreationStyles.backImage]}
                />
              </TouchableOpacity>
            </View>
            <View style={profileCreationStyles.titleContainer}>
              <Text style={profileCreationStyles.textTitle}>
                Gender mo, mars?
              </Text>

              <View style={profileCreationStyles.gridContainer}>
                {letters.map((letter, index) => (
                  <Controller
                    key={index}
                    control={control}
                    name="selectedLetter" // Use a single name
                    render={({field: {onChange}}) => (
                      <LetterGradientButton
                        letter={letter}
                        selectedLetter={selectedLetter}
                        onChange={(item: string) => {
                          onChange(item);
                          //TODO: Check if selected letter is changed based on onchange item
                          setSelectedLetter(item);
                        }}
                      />
                    )}
                  />
                ))}
                {errors.selectedLetter && (
                  <Text style={profileCreationStyles.errorText}>
                    {errors.selectedLetter.message}
                  </Text>
                )}
                {/*</View>*/}
              </View>
              <View style={profileCreationStyles.bodyContainer}>
                <Text style={profileCreationStyles.textBody}>
                  This will appear on your profile, but feel free to choose what
                  you're comfortable with!
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
    </SafeAreaProvider>
  );
};

export default CustomerGender;
