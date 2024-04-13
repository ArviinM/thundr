import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import {NavigationProp, useNavigation} from '@react-navigation/native';

import StepProgressBar from '../../../components/shared/StepProgressBar.tsx';

import {IMAGES} from '../../../constants/images.ts';
import {RootNavigationParams} from '../../../constants/navigator.ts';

import {
  KeyboardAwareScrollView,
  KeyboardStickyView,
} from 'react-native-keyboard-controller';
import {profileCreationStyles} from './styles.tsx';

import CircleButton from '../../../components/shared/CircleButton.tsx';
import SelectableButton from '../../../components/CustomerPersonalityType/SelectableButton.tsx';
import useCustomerDetailsStore from '../../../store/detailsStore.ts';
import {useAuth} from '../../../providers/Auth.tsx';
import {personalityData} from '../../../components/CustomerPersonalityType/personalityData.ts';

const CustomerPersonalityType = () => {
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();
  const [loading, isLoading] = useState(false);
  const auth = useAuth();
  const [selectedPersonality, setSelectedPersonality] = useState<{
    index: number;
    text: string;
  }>();

  const updateCustomerDetails = useCustomerDetailsStore(
    state => state.updateCustomerDetails,
  );

  const handleSelectedPersonality = (index: number, text: string) => {
    setSelectedPersonality({index, text});
  };

  const onSubmit = async () => {
    try {
      isLoading(true);
      console.log(selectedPersonality?.text);

      updateCustomerDetails({
        personalityType: selectedPersonality?.text,
      });

      isLoading(false);
      navigation.navigate('CustomerPhotoBio');
    } catch (error) {
      console.error(error);
    }
  };

  const isSelectedPersonality = selectedPersonality !== undefined;

  return (
    <SafeAreaView
      edges={['top', 'bottom']}
      style={profileCreationStyles.container}>
      <StepProgressBar currentStep={8} totalSteps={10} />
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
                buttonData={personalityData}
                onPress={handleSelectedPersonality}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <KeyboardStickyView offset={{closed: -20, opened: 0}}>
        <View style={profileCreationStyles.footerContainer}>
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('CustomerPhotoBio');
                updateCustomerDetails({
                  sub: auth.authData?.sub,
                });
              }}>
              <Text style={profileCreationStyles.skipText}>Skip</Text>
            </TouchableOpacity>
          </View>
          <View>
            <CircleButton
              onPress={onSubmit}
              disabled={!isSelectedPersonality}
              loading={loading}
            />
          </View>
        </View>
      </KeyboardStickyView>
    </SafeAreaView>
  );
};

export default CustomerPersonalityType;
