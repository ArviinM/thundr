import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import {Platform} from 'react-native';
import {PERMISSIONS, request} from 'react-native-permissions';

// async function onMessageReceived(message: {
//   notification: {title: any; body: any};
// }) {
//   // Create a local notification based on the message data
//   await notifee.displayNotification({
//     title: message.notification?.title, // Optional chaining for safety
//     body: message.notification?.body, // Optional chaining for safety
//     android: {
//       channelId: 'default',
//       importance: AndroidImportance.HIGH,
//     },
//   });
// }

// async function onDisplayNotification(message) {
//   const channelId = await notifee.createChannel({
//     id: 'default',
//     name: 'Default Channel',
//     sound: 'thundr',
//   });
// }

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

export async function onMessageReceived(message: any) {
  await onDisplayNotification(message);
}

async function onDisplayNotification(message: {data: {channelType: string}}) {
  if (Platform.OS === 'ios') {
    await notifee.requestPermission();
  }
  //
  // const channelId = await notifee.createChannel({
  //   id: 'default',
  //   name: 'Default Channel',
  //   sound: 'thundr',
  // });

  if (message.data.channelType === 'MATCH') {
    console.log('MATCHED');
    console.log(message.data);
    // store.dispatch({
    //   type: UPDATE_NOTIFICATION_STATE,
    //   newState: {
    //     notificationData: {
    //       isMare: message.data.matchType === 'MARE',
    //       matchPhoto: message.data.matchPhoto,
    //     },
    //   },
    // });
    // RootNavigation.navigate('MatchFound');
  }
  //
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
