// React modules
import React, {useEffect} from 'react';
import {LogBox, PermissionsAndroid, Platform, View, Text} from 'react-native';

// Third party libraries
import {RootSiblingParent} from 'react-native-root-siblings';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {PERMISSIONS, request} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';

// Utils
import RootNavigation from './src/navigations';
import store, {persistor} from './src/ducks/store';
import messaging from '@react-native-firebase/messaging';
import {onMessageReceived} from './src/utils/notifications';
import {scale} from './src/utils/commons';

LogBox.ignoreAllLogs();

const App = () => {
  useEffect(() => {
    return messaging().onMessage(onMessageReceived);
  }, []);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        if (Platform.OS === 'android') {
          const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if (result === PermissionsAndroid.RESULTS.GRANTED) {
            getCurrentLocation();
          } else {
            console.log('Location permission denied on Android');
          }
        } else if (Platform.OS === 'ios') {
          const result = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
          if (result === 'granted') {
            getCurrentLocation();
          } else {
            console.log('Location permission denied on iOS');
          }
        }
      } catch (error) {
        console.error('Error requesting location permission:', error);
      }
    };

    // Get the current location
    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          console.log('Current location:', latitude, longitude);
        },
        error => {
          console.error('Error getting location:', error);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    };

    requestLocationPermission();
  }, []);

  const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: props => <BaseToast {...props} />,
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: props => <ErrorToast {...props} />,
    /*
      Or create a completely new type - `tomatoToast`,
      building the layout from scratch.

      I can consume any custom `props` I want.
      They will be passed when calling the `show` method (see below)
    */
    warning: ({text1, text2, props}) => (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#E43C59',
          height: 60,
          width: '90%',
          borderRadius: 20,
          borderWidth: 3,
          borderColor: '#FEBC29',
        }}>
        <Text
          style={{
            fontFamily: 'Montserrat-Bold',
            fontSize: scale(18),
            color: '#fff',
          }}>
          {text1}
        </Text>
        <Text
          style={{
            fontFamily: 'Montserrat-Regular',
            fontSize: scale(12),
            color: '#fff',
          }}>
          {text2}
        </Text>
      </View>
    ),
  };

  return (
    <RootSiblingParent>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootNavigation />
        </PersistGate>
        <Toast config={toastConfig} />
      </Provider>
    </RootSiblingParent>
  );
};

export default App;
