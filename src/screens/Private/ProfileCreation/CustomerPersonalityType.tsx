import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';

import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
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
import {COLORS} from '../../../constants/commons.ts';
import InterestButtonContainer from '../../../components/CustomerInterest/InterestButtonContainer.tsx';
import {interestOptions} from '../../../components/CustomerInterest/options.ts';
import CircleButton from '../../../components/shared/CircleButton.tsx';
import SelectableButton, {
  ButtonData,
} from '../../../components/CustomerPersonalityType/SelectableButton.tsx';

const CustomerPersonalityType = () => {
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();

  const [loading, isLoading] = useState(false);

  const [selectedPersonality, setSelectedPersonality] = useState<{
    index: number;
    text: string;
  }>();

  const buttonData: ButtonData[] = [
    {
      title: 'Lion',
      body:
        'Takes charge, Determined,\n' +
        'Assertive, Competitive,\n' +
        'Leader, Goal-driven,\n' +
        'Self-reliant, Adventurous.',
      defaultImage: IMAGES.lion,
      selectedImage: IMAGES.lionSelected,
    },
    {
      title: 'Otter',
      body:
        'Takes risks, Visionary,\n' +
        'Energetic, Promoter, \n' +
        'Fun-loving, Enjoys change,\n' +
        'Creative, Optimistic.',
      defaultImage: IMAGES.otter,
      selectedImage: IMAGES.otterSelected,
    },
    {
      title: 'Dog',
      body:
        'Loyal, Deep relationships,\n' +
        'Adaptable, Sympathetic,\n' +
        'Thoughtful, Nurturing,\n' +
        'Tolerant, Good listener.\n',
      defaultImage: IMAGES.dog,
      selectedImage: IMAGES.dogSelected,
    },
    {
      title: 'Beaver',
      body:
        'Deliberate, Controlled,\n' +
        'Reserved, Practical, Factual,\n' +
        'Analytical, Inquisitive,\n' +
        'Persistent.',
      defaultImage: IMAGES.beaver,
      selectedImage: IMAGES.beaverSelected,
    },
  ];

  const handleSelectedPersonality = (index: number, text: string) => {
    setSelectedPersonality({index, text});
  };

  const onSubmit = async () => {
    try {
      isLoading(true);
      console.log(selectedPersonality);
      // const result = await emailValidation.mutateAsync({
      //   phoneNumber: username,
      //   email: data.email,
      //   session: session,
      //   challengeName: challengeName,
      // } as EmailValidationRequest);

      isLoading(false);
      // navigation.navigate('EmailVerification', result);
    } catch (error) {
      // Handle validation errors
      console.error(error);
    }
  };

  // const isSelectedPersonality = selectedPersonality !== undefined;

  return (
    <SafeAreaProvider>
      <SafeAreaView
        edges={['top', 'bottom']}
        style={profileCreationStyles.container}>
        <StepProgressBar currentStep={3} totalSteps={6} />
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
                Personality type
              </Text>
              <Text style={profileCreationStyles.textSubtitle}>
                Choose which one best describes you. Now na! 🥳
              </Text>
              {/*  Button Container */}
              <View style={profileCreationStyles.buttonInterestContainer}>
                {/*  Buttons here*/}
                <SelectableButton
                  buttonData={buttonData}
                  onPress={handleSelectedPersonality}
                />
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <KeyboardStickyView offset={{closed: -20, opened: 0}}>
          <View style={profileCreationStyles.footerContainer}>
            <View>
              <TouchableOpacity>
                <Text style={profileCreationStyles.skipText}>Skip</Text>
              </TouchableOpacity>
            </View>
            <View>
              <CircleButton
                onPress={onSubmit}
                // disabled={isSelectedPersonality}
              />
            </View>
          </View>
        </KeyboardStickyView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default CustomerPersonalityType;
