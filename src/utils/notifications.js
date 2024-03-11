import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
import {PERMISSIONS, request} from 'react-native-permissions';
import notifee from '@notifee/react-native';

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

export async function onMessageReceived(message) {
  await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    sound: 'thundr',
  });

  console.log(JSON.stringify(message, 0, 2));

  await notifee.displayNotification({
    title: 'Notification Title',
    body: 'Main body content of the notification',
    android: {
      channelId,
      pressAction: {
        id: 'default',
      },
    },
    ios: {
      channelId,
      pressAction: {
        id: 'default',
      },
      sound: 'thundr.wav',
    },
  });
}
