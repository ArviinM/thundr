// React Modules
import {Platform} from 'react-native';
import {PERMISSIONS, request} from 'react-native-permissions';

// Third Party Libraries
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

// Utils
import store from '../ducks/store';
import {UPDATE_PERSISTED_STATE} from '../ducks/PersistedState/actionTypes';
import {UPDATE_NOTIFICATION_STATE} from '../ducks/Notification/actionTypes';
import * as RootNavigation from '../navigations/tempNavigation';

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

  if (message.data.channelType === 'MATCH') {
    store.dispatch({
      type: UPDATE_NOTIFICATION_STATE,
      newState: {
        notificationData: {
          isMare: message.data.matchType === 'MARE',
          matchPhoto: message.data.matchPhoto,
        },
      },
    });
    RootNavigation.navigate('MatchFound');
  }

  const state = store.getState();
  const {chatRoomID} = state.persistedState;

  if (chatRoomID !== message.data.chatRoomUuid) {
    await notifee.displayNotification({
      title: message.notification.title,
      body: message.notification.body,
      data: message.data,
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
}

export async function onMessageReceived(message) {
  await onDisplayNotification(message);
}
