import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
import {PERMISSIONS, request} from 'react-native-permissions';

export async function checkApplicationNotificationPermission() {
  let authStatus = await messaging().hasPermission();

  if (authStatus !== messaging.AuthorizationStatus.AUTHORIZED) {
    if (Platform.OS === 'ios') {
      authStatus = await messaging().requestPermission();

      if (authStatus === messaging.AuthorizationStatus.DENIED) {
        await unregisterDeviceForRemoteMessages();
        return;
      }
    } else if (Platform.OS === 'android') {
      await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);

      authStatus = messaging.AuthorizationStatus.AUTHORIZED;
    }
  }

  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);

    if (Platform.OS === 'android') {
      await registerDeviceForRemoteMessages();
    }

    const fcmToken = await messaging().getToken();
    console.log('FCM Token:', fcmToken);
  }
}

async function registerDeviceForRemoteMessages() {
  await messaging().registerDeviceForRemoteMessages();
  console.log('Device registered for remote messages.');
}

async function unregisterDeviceForRemoteMessages() {
  await messaging().unregisterDeviceForRemoteMessages();
  console.log('Device unregistered for remote messages.');
}
