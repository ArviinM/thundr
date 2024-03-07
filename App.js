// React modules
import React, {useEffect, useState} from 'react';
import {Alert, LogBox, PermissionsAndroid, Platform} from 'react-native';

// Third party libraries
import {RootSiblingParent} from 'react-native-root-siblings';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {PERMISSIONS, request} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

// Utils
import RootNavigation from './src/navigations';
import store, {persistor} from './src/ducks/store';
import messaging from '@react-native-firebase/messaging';

LogBox.ignoreAllLogs();

const App = () => {
  const [location, setLocation] = useState(null);

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    // Added log for testing purposes
    console.log('Message handled in the background!', remoteMessage);
  });

  useEffect(() => {
    return messaging().onMessage(async remoteMessage => {
      // TODO: Change UI for Alerting User - Like In App Notifications
      Alert.alert(
        remoteMessage.notification.title,
        remoteMessage.notification.body,
      );
    });
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
          setLocation({latitude, longitude});
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

  return (
    <RootSiblingParent>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootNavigation />
        </PersistGate>
      </Provider>
    </RootSiblingParent>
  );
};

export default App;
