import React, {useState} from 'react';
import {
  Alert,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

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
  request,
  requestNotifications,
} from 'react-native-permissions';
import {GeolocationResponse} from '@react-native-community/geolocation/js/NativeRNCGeolocation.ts';
import {useAuth} from '../../../providers/Auth.tsx';
import {queryClient} from '../../../utils/queryClient.ts';
import {useQueryClient} from '@tanstack/react-query';
import {getCurrentLocation} from '../../../utils/getCurrentLocation.ts';
import {useCustomerMatchLocation} from '../../../hooks/match/useCustomerMatchLocation.ts';

const CustomerRequestAccess = () => {
  const queryClient1 = useQueryClient(queryClient);
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();
  const matchLocation = useCustomerMatchLocation();

  const [loading, isLoading] = useState(false);
  const auth = useAuth();
  const onSubmit = () => {
    try {
      isLoading(true);

      isLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const requestLocationPermission = async () => {
    // iOS Part:
    if (Platform.OS === 'ios') {
      // TODO: Add to Login Page
      // const result2 = await request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
      // if (result2 === 'granted') {
      //   getCurrentLocation();
      // } else if (result2 === 'blocked') {
      //   getCurrentLocation();
      // } else {
      //   console.log('Notification permission denied on iOS');
      // }

      //TODO: Save match location to server - will work on it in Sprint 2
      const result = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
      if (result === 'granted') {
        const position = (await getCurrentLocation()) as GeolocationResponse;
        if (auth.authData?.sub) {
          await matchLocation.mutateAsync({
            sub: auth.authData.sub,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          });
        }
      } else if (result === 'blocked') {
        const position = (await getCurrentLocation()) as GeolocationResponse;
        if (auth.authData?.sub) {
          await matchLocation.mutateAsync({
            sub: auth.authData.sub,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          });
        }
      } else {
        console.log('Location permission denied on iOS');
      }

      const notificationResult = await requestNotifications(['alert', 'sound']);
      if (notificationResult.status === 'granted') {
        console.log('user allowed notification');
      } else {
        console.log('user notification is not blocked');
      }
    }

    if (Platform.OS === 'android') {
      const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      const result2 = await request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);

      if (result === 'granted') {
        const position = (await getCurrentLocation()) as GeolocationResponse;
        if (auth.authData?.sub) {
          await matchLocation.mutateAsync({
            sub: auth.authData.sub,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          });
        }
      } else {
        console.log('Location permission denied on Android');
      }

      if (result2 === 'granted') {
        const position = (await getCurrentLocation()) as GeolocationResponse;
        if (auth.authData?.sub) {
          await matchLocation.mutateAsync({
            sub: auth.authData.sub,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          });
        }
      } else {
        console.log('Location permission denied on Android');
      }

      const notificationResult = await requestNotifications(['alert', 'sound']);
      if (notificationResult.status === 'granted') {
        console.log('user allowed notification');
      } else {
        console.log('user notification is not blocked');
      }
    }
    if (auth.authData?.sub) {
      navigation.navigate('CompatibilityQuestions', {sub: auth.authData.sub});
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
