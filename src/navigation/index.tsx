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

const RootNavigation = () => {
  const {authData, loading} = useAuth();

  // For android notifications
  useEffect(() => {
    //background state
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(JSON.stringify(remoteMessage, 0, 2));
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
        }
      }
    });
    //closed state
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log(JSON.stringify(remoteMessage, 0, 2));
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

          if (notificationData.data.channelType === 'MATCH') {
            navigationRef.navigate('MatchFound', {
              sub: '',
              isMare: notificationData.data.matchType === 'MARE',
              matchPhoto: notificationData.data.matchPhoto,
            } as RootNavigationParams['MatchFound']); // Type assertion to ensure correct parameters
          }
          break;
      }
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        BootSplash.hide({fade: true});
      }}>
      {authData ? <AuthenticatedStack /> : <LoginStack />}
    </NavigationContainer>
  );
};

export default RootNavigation;
