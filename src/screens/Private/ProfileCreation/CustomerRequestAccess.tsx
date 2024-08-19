import React, {useState} from 'react';
import {
  Alert,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

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

import {
  PERMISSIONS,
  PermissionStatus,
  request,
  requestNotifications,
} from 'react-native-permissions';
import {GeolocationResponse} from '@react-native-community/geolocation/js/NativeRNCGeolocation.ts';
import {useAuth} from '../../../providers/Auth.tsx';
import {getCurrentLocation} from '../../../utils/getCurrentLocation.ts';
import {useCustomerMatchLocation} from '../../../hooks/match/useCustomerMatchLocation.ts';

const CustomerRequestAccess = () => {
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();
  const matchLocation = useCustomerMatchLocation();
  const [loading, setLoading] = useState(false);
  const auth = useAuth();

  const handleError = (error: Error, context: string) => {
    console.error(`Error in ${context}:`, error);
    Alert.alert(
      'Error',
      `An error occurred while ${context}. Please try again.`,
    );
    setLoading(false);
  };

  const updateMatchLocation = async (position: GeolocationResponse) => {
    if (!auth.authData?.sub) {
      throw new Error('User not authenticated');
    }
    await matchLocation.mutateAsync({
      sub: auth.authData.sub,
      latitude: position.coords.latitude.toString(),
      longitude: position.coords.longitude.toString(),
    });
  };

  const handleLocationPermissionResult = async (result: PermissionStatus) => {
    if (result === 'granted' || result === 'limited') {
      try {
        const position = (await getCurrentLocation()) as GeolocationResponse;
        await updateMatchLocation(position);
      } catch (error) {
        handleError(error as Error, 'accessing location');
      }
    } else {
      console.log(`Location permission ${result} on ${Platform.OS}`);
      Alert.alert(
        'Location Access Required',
        'Please enable location access in your device settings to use this feature.',
      );
    }
  };

  const requestLocationPermission = async () => {
    setLoading(true);
    try {
      if (Platform.OS === 'ios') {
        const result = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
        await handleLocationPermissionResult(result);
      } else if (Platform.OS === 'android') {
        const fineResult = await request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );
        const coarseResult = await request(
          PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
        );
        if (fineResult === 'granted' || coarseResult === 'granted') {
          await handleLocationPermissionResult('granted');
        } else {
          handleLocationPermissionResult('denied');
        }
      }

      const notificationResult = await requestNotifications(['alert', 'sound']);
      if (notificationResult.status === 'granted') {
        console.log('User allowed notifications');
      } else {
        console.log('User notification permission is not granted');
        Alert.alert(
          'Notification Access',
          'Notifications are not enabled. You may miss important updates.',
        );
      }

      if (auth.authData?.sub) {
        navigation.navigate('CompatibilityQuestions', {sub: auth.authData.sub});
      } else {
        throw new Error('User not authenticated');
      }
    } catch (error) {
      handleError(error as Error, 'requesting permissions');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      edges={['top', 'bottom']}
      style={profileCreationStyles.container}>
      <StepProgressBar currentStep={4} totalSteps={10} />
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
            <View style={profileCreationStyles.imageContainer}>
              <Image
                source={IMAGES.locNotif}
                resizeMode={'contain'}
                style={{width: 300, height: 220}}
              />
            </View>
            <Text
              style={[profileCreationStyles.textImage, {textAlign: 'center'}]}>
              Location & Notification
            </Text>
            <View style={profileCreationStyles.bodyContainer}>
              <Text
                style={[profileCreationStyles.textBody, {textAlign: 'center'}]}>
                Better matching experience? Turn this on to track your potential
                mare and jowa. {'\n\n'}Plus, receive push and in-app
                notifications para updated ka sa latest news and chika from
                Thundr.
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <KeyboardStickyView offset={{closed: -20, opened: 0}}>
        <View style={profileCreationStyles.buttonContainer}>
          <GradientButton
            onPress={requestLocationPermission}
            text="Next"
            loading={loading}
            buttonStyle={profileCreationStyles.buttonStyle}
            textStyle={profileCreationStyles.buttonTextStyle}
          />
        </View>
      </KeyboardStickyView>
    </SafeAreaView>
  );
};

export default CustomerRequestAccess;
