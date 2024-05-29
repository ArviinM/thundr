import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BootSplash from 'react-native-bootsplash';
import {navigationRef, RootNavigationParams} from '../constants/navigator.ts';
import {useAuth} from '../providers/Auth.tsx';
import {Loading} from '../components/shared/Loading.tsx';
import {LoginStack} from './Public/LoginStack.tsx';
import {AuthenticatedStack} from './Private/AuthenticatedStack.tsx';
import notifee, {EventType} from '@notifee/react-native';
import {useEffect} from 'react';
import {NotificationData, RemoteData} from '../types/generated.ts';
import messaging from '@react-native-firebase/messaging';
import useChatRoomIdNotifStore from '../store/chatRoomIdNotifStore.ts';
import {socket} from '../utils/socket.ts';
import {APP_IDENTIFIER} from '@env';

const RootNavigation = () => {
  const {authData, loading} = useAuth();
  const setChatRoom = useChatRoomIdNotifStore(state => state.setChatRoom);

  // For android notifications
  useEffect(() => {
    //background state
    messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage) {
        const notificationData = remoteMessage.data as RemoteData;
        if (notificationData) {
          if (notificationData.channelType === 'MATCH') {
            navigationRef.navigate('MatchFound', {
              sub: '',
              isMare: notificationData.matchType === 'MARE',
              matchPhoto: notificationData.matchPhoto,
            } as RootNavigationParams['MatchFound']);
          }
          if (notificationData.channelType === 'CHAT') {
            setChatRoom(notificationData.chatRoomUuid);
            navigationRef.reset({
              index: 0, // Reset to the first screen in the stack
              routes: [
                {
                  name: 'Messages',
                  params: {
                    isMare: notificationData.matchType.toLowerCase() === 'mare',
                  },
                },
              ],
            });
          }
        }
      }
    });
    //closed state
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          const notificationData = remoteMessage.data as RemoteData;
          if (notificationData) {
            if (notificationData.channelType === 'MATCH') {
              navigationRef.navigate('MatchFound', {
                sub: '',
                isMare: notificationData.matchType === 'MARE',
                matchPhoto: notificationData.matchPhoto,
              } as RootNavigationParams['MatchFound']);
            }
            if (notificationData.channelType === 'CHAT') {
              setChatRoom(notificationData.chatRoomUuid);
              navigationRef.reset({
                index: 0,
                routes: [
                  {
                    name: 'Messages',
                    params: {
                      isMare:
                        notificationData.matchType.toLowerCase() === 'mare',
                    },
                  },
                ],
              });
            }
          }
        }
      });
  }, []);

  // For iOS notifications
  useEffect(() => {
    return notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          // console.log('User dismissed notification.');
          break;
        case EventType.PRESS:
          const notificationData: NotificationData =
            detail.notification as NotificationData;
          console.log(notificationData.data);
          if (notificationData.data.channelType === 'MATCH') {
            navigationRef.navigate('MatchFound', {
              sub: '',
              isMare: notificationData.data.matchType === 'MARE',
              matchPhoto: notificationData.data.matchPhoto,
              chatRoomId: notificationData.data.chatRoomUuid,
            } as RootNavigationParams['MatchFound']);
          }
          if (notificationData.data.channelType === 'CHAT') {
            setChatRoom(notificationData.data.chatRoomUuid);
            navigationRef.reset({
              index: 0, // Reset to the first screen in the stack
              routes: [
                {
                  name: 'Messages',
                  params: {
                    isMare:
                      notificationData.data.matchType.toLowerCase() === 'mare',
                  },
                },
              ],
            });
          }
          break;
      }
    });
  }, []);

  useEffect(() => {
    console.log(socket?.connected);
  }, [socket?.connected]);

  const config = {
    screens: {
      Login: 'sso/:payload',
      HomeDrawer: {
        screens: {
          HomeTab: {
            screens: {HomeStack: {screens: {Home: 'subscribed/:payload'}}},
          },
        },
      },
      // MatchFound: 'subscribed/:payload',
    },
  };

  const linking = {
    prefixes: [`${APP_IDENTIFIER}://`],
    config,
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      linking={linking}
      onReady={() => {
        BootSplash.hide({fade: true});
      }}>
      {authData ? <AuthenticatedStack /> : <LoginStack />}
    </NavigationContainer>
  );
};

export default RootNavigation;
