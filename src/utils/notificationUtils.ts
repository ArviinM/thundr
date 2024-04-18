import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import {Platform} from 'react-native';
import {navigationRef, RootNavigationParams} from '../constants/navigator.ts';
import {NotificationData} from '../types/generated.ts';
import {useAuth} from '../providers/Auth.tsx';
import {useAuthStore} from '../store/authStore.ts';

export async function registerDeviceForRemoteMessages() {
  await messaging().registerDeviceForRemoteMessages();
  console.log('Device registered for remote messages.');
}

export async function unregisterDeviceForRemoteMessages() {
  await messaging().unregisterDeviceForRemoteMessages();
  console.log('Device unregistered for remote messages.');
}

export async function getDeviceToken(): Promise<string | undefined> {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
    console.log('Your Firebase token is:', fcmToken);
    return fcmToken;
  } else {
    console.error('Failed to get FCM token');
    return undefined;
  }
}

export async function onMessageReceived(message: NotificationData) {
  await onDisplayNotification(message);
}

async function onDisplayNotification(message: NotificationData) {
  if (Platform.OS === 'ios') {
    await notifee.requestPermission();
  }
  const notificationData: NotificationData = message;
  const authData = useAuthStore.getState().authData;

  if (authData && notificationData.data.channelType === 'MATCH') {
    console.log('MATCHED');
    console.log(message.data);

    navigationRef.navigate('MatchFound', {
      sub: '',
      isMare: notificationData.data.matchType === 'MARE',
      matchPhoto: notificationData.data.matchPhoto,
    } as RootNavigationParams['MatchFound']);
  }

  // const state = store.getState();
  // const {chatRoomID} = state.persistedState;
  //
  // if (chatRoomID !== message.data.chatRoomUuid) {
  //   await notifee.displayNotification({
  //     title: message.notification.title,
  //     body: message.notification.body,
  //     data: message.data,
  //     android: {
  //       channelId,
  //       pressAction: {
  //         id: 'default',
  //       },
  //     },
  //     ios: {
  //       channelId,
  //       pressAction: {
  //         id: 'default',
  //       },
  //       sound: 'thundr.wav',
  //     },
  //   });
  // }
}
