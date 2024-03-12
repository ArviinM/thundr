// React Modules
import {Platform} from 'react-native';
import {PERMISSIONS, request} from 'react-native-permissions';

// Third Party Libraries
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

// Utils
import store from '../ducks/store';
import {UPDATE_PERSISTED_STATE} from '../ducks/PersistedState/actionTypes';

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
  let fcmToken = '';
  if (enabled) {
    console.log('Authorization status:', authStatus);

    if (Platform.OS === 'android') {
      await registerDeviceForRemoteMessages();
    }

    fcmToken = await messaging().getToken();
    console.log('FCM Token:', fcmToken);

    store.dispatch({
      type: UPDATE_PERSISTED_STATE,
      newState: {fcmToken: fcmToken},
    });
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

async function onDisplayNotification(message) {
  if (Platform.OS === 'ios') {
    await notifee.requestPermission();
  }

  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    sound: 'thundr',
  });

  console.log(JSON.stringify(message, 0, 2));

  await notifee.displayNotification({
    title: message.notification.title,
    body: message.notification.body,
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

export async function onMessageReceived(message) {
  await onDisplayNotification(message);

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('Notification Opened App', JSON.stringify(remoteMessage, 0, 2));

    // if (
    //   !!remoteMessage?.data &&
    //   remoteMessage?.data?.redirect_to == 'ProductDetail'
    // ) {
    //   setTimeout(() => {
    //     NavigationService.navigate('ProductDetail', {
    //       data: remoteMessage?.data,
    //     });
    //   }, 1200);
    // }
    //
    // if (
    //   !!remoteMessage?.data &&
    //   remoteMessage?.data?.redirect_to == 'Profile'
    // ) {
    //   setTimeout(() => {
    //     NavigationService.navigate('Profile', {data: remoteMessage?.data});
    //   }, 1200);
    // }
  });
}
