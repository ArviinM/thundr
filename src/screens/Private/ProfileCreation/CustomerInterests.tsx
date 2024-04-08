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
import useCustomerDetailsStore from '../../../store/detailsStore.ts';
import {useAuth} from '../../../providers/Auth.tsx';

const CustomerInterests = () => {
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();

  const [loading, isLoading] = useState(false);

  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const updateCustomerDetails = useCustomerDetailsStore(
    state => state.updateCustomerDetails,
  );

  const auth = useAuth();
  const handleSelectionChange = (newSelectedOptions: string[]) => {
    setSelectedInterests(newSelectedOptions);
  };

  const onSubmit = async () => {
    try {
      isLoading(true);

      updateCustomerDetails({
        sub: auth.authData?.sub,
        hobbies: selectedInterests.toString(),
      });

      isLoading(false);
      navigation.navigate('CustomerAdditionalInfos');
    } catch (error) {
      console.error(error);
    }
  };

  const isSelectedInterest = selectedInterests.length < 1;

  return (
    <SafeAreaProvider>
      <SafeAreaView
        edges={['top', 'bottom']}
        style={profileCreationStyles.container}>
        <StepProgressBar currentStep={6} totalSteps={10} />
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
              <Text style={profileCreationStyles.textTitle}>Interests</Text>
              <Text style={profileCreationStyles.textSubtitle}>
                Looking for the perfect match, mars? Select up to 4 interests 🥰
              </Text>
              {/*  Button Container */}
              <View style={profileCreationStyles.buttonInterestContainer}>
                {/*  Buttons here*/}
                <InterestButtonContainer
                  options={interestOptions}
                  onSelectionChange={handleSelectionChange}
                />
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <KeyboardStickyView offset={{closed: -20, opened: 0}}>
          <View style={profileCreationStyles.footerContainer}>
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate('CustomerAdditionalInfos')}>
                <Text style={profileCreationStyles.skipText}>Skip</Text>
              </TouchableOpacity>
            </View>
            <View>
              <CircleButton onPress={onSubmit} disabled={isSelectedInterest} />
            </View>
          </View>
        </KeyboardStickyView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default CustomerInterests;
