import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import {Platform} from 'react-native';
import {navigationRef, RootNavigationParams} from '../constants/navigator.ts';
import {NotificationData} from '../types/generated.ts';
import {useAuth} from '../providers/Auth.tsx';
import {useAuthStore} from '../store/authStore.ts';
import useChatRoomIDStore from '../store/chatRoomIdStore.ts';
import useChatRoomIdNotifStore from '../store/chatRoomIdNotifStore.ts';

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
    navigationRef.navigate('MatchFound', {
      sub: '',
      isMare: notificationData.data.matchType.toLowerCase() === 'mare',
      matchPhoto: notificationData.data.matchPhoto,
      chatRoomId: notificationData.data.chatRoomUuid,
    } as RootNavigationParams['MatchFound']);
  }

  const chatRoom = useChatRoomIDStore.getState().chatRoom;

  if (chatRoom !== notificationData.data.chatRoomUuid) {
    await notifee.displayNotification({
      title: notificationData.notification.title,
      body: notificationData.notification.body,
      data: notificationData.data,
      android: {
        channelId: 'default_channel',
        pressAction: {
          id: 'default',
        },
      },
      ios: {
        // channelId,
        sound: 'thundr.wav',
      },
    });
  }
}
