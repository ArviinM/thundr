// React modules
import React, {useEffect} from 'react';

// Third party libraries
import {NavigationContainer} from '@react-navigation/native';
import notifee, {EventType} from '@notifee/react-native';
import BootSplash from 'react-native-bootsplash';

// Utils
import {navigationRef} from './tempNavigation';
import PublicScreenNavigation from './PublicScreenNavigation/PublicScreenNavigation';
import {useDispatch, useSelector} from 'react-redux';
import PrivateScreenNavigation from './PrivateScreenNavigation/PrivateScreenNavigation';
import Modal from '../composition/Modal/Modal';
import {GENERIC_ERROR} from '../utils/commons';
import {START_LOGIN_VIA_REFRESH_TOKEN} from '../ducks/Login/actionTypes';
import {UPDATE_NOTIFICATION_STATE} from '../ducks/Notification/actionTypes';
import messaging from '@react-native-firebase/messaging';

const RootNavigation = () => {
  const dispatch = useDispatch();
  const loginState = useSelector(state => state.login);
  const authenticated = loginState ? loginState.authenticated : false;
  const showModal = loginState ? loginState.showModal : false;
  const modalMessage = loginState ? loginState.modalMessage : '';
  const loginData = loginState ? loginState.loginData : null;

  const mobileEmailState = useSelector(state => state.mobileEmail) || {};
  const showEmailModal = mobileEmailState.showModal || false;
  const mobileEmailMessage = mobileEmailState.modalMessage || '';

  const ssoValidationState = useSelector(state => state.ssoValidation) || {};
  const showSSOModal = ssoValidationState.showModal || false;
  const ssoValidationMessage = ssoValidationState.modalMessage || '';

  const profileCreationState =
    useSelector(state => state.profileCreation) || {};
  const showProfileCreationModal = profileCreationState.showModal || false;
  const profileCreationModalMessage = profileCreationState.modalMessage || '';

  const persistedState = useSelector(state => state.persistedState);
  const refreshToken = persistedState ? persistedState.refreshToken : '';
  const sub = persistedState ? persistedState.sub : '';

  const config = {
    screens: {LoginOptionScreen: 'sso/:payload'},
  };

  const linking = {
    prefixes: ['ph.thundr.app://'],
    config,
  };

  useEffect(() => {
    if (loginData?.loginDeactivated) {
    }
  }, [loginData, dispatch]);

  useEffect(() => {
    if (refreshToken) {
      dispatch({
        type: START_LOGIN_VIA_REFRESH_TOKEN,
        payload: {refreshToken, sub},
      });
    }
  }, [dispatch, refreshToken, sub]);

  // For android notifications
  useEffect(() => {
    // Existing onNotificationOpenedApp listener (unchanged)`
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('User opened the notification in background state:');
      if (remoteMessage) {
        console.info('User opened the notification in closed state.');
        if (remoteMessage.data.channelType === 'CHAT') {
          dispatch({
            type: UPDATE_NOTIFICATION_STATE,
            newState: {
              notificationData: {
                messageNotification: true,
                isMare: remoteMessage.data.matchType === 'MARE',
                targetSub: remoteMessage.data.targetSub,
              },
            },
          });
          navigationRef.current.navigate('Messages');
        }
        if (remoteMessage.data.channelType === 'MATCH') {
          dispatch({
            type: UPDATE_NOTIFICATION_STATE,
            newState: {
              notificationData: {
                // matchNotification: true,
                isMare: remoteMessage.data.matchType === 'MARE',
                matchPhoto: remoteMessage.data.matchPhoto,
              },
            },
          });
          navigationRef.current.navigate('MatchFound');
        }
      }
    });

    // Add getInitialNotification for handling closed app launch
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.info('User opened the notification in closed state.');
          setTimeout(() => {
            if (remoteMessage.data.channelType === 'CHAT') {
              dispatch({
                type: UPDATE_NOTIFICATION_STATE,
                newState: {
                  notificationData: {
                    messageNotification: true,
                    isMare: remoteMessage.data.matchType === 'MARE',
                    targetSub: remoteMessage.data.targetSub,
                  },
                },
              });
              navigationRef.current.navigate('Messages');
            }
            if (remoteMessage.data.channelType === 'MATCH') {
              dispatch({
                type: UPDATE_NOTIFICATION_STATE,
                newState: {
                  notificationData: {
                    // matchNotification: true,
                    isMare: remoteMessage.data.matchType === 'MARE',
                    matchPhoto: remoteMessage.data.matchPhoto,
                  },
                },
              });
              navigationRef.current.navigate('MatchFound');
            }
          }, 2000);
        }
      });
  }, []);

  // For iOS notifications
  useEffect(() => {
    return notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification.');
          break;
        case EventType.PRESS:
          console.log(
            'User pressed notification',
            JSON.stringify(detail, 0, 2),
          );

          if (detail.notification.data.channelType === 'CHAT') {
            dispatch({
              type: UPDATE_NOTIFICATION_STATE,
              newState: {
                notificationData: {
                  messageNotification: true,
                  isMare: detail.notification.data.matchType === 'MARE',
                  targetSub: detail.notification.data.targetSub,
                },
              },
            });
            navigationRef.current.navigate('DashboardTabs', {
              screen: 'Messages',
            });
          }

          if (detail.notification.data.channelType === 'MATCH') {
            dispatch({
              type: UPDATE_NOTIFICATION_STATE,
              newState: {
                notificationData: {
                  // matchNotification: true,
                  isMare: detail.notification.data.matchType === 'MARE',
                  matchPhoto: detail.notification.data.matchPhoto,
                },
              },
            });
            navigationRef.current.navigate('MatchFound');
          }
          break;
      }
    });
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      linking={linking}
      onReady={() => {
        BootSplash.hide();
      }}
      theme={{colors: {background: '#f2cecd'}}}>
      <Modal
        modalMessage={
          modalMessage ||
          profileCreationModalMessage ||
          mobileEmailMessage ||
          ssoValidationMessage ||
          GENERIC_ERROR
        }
        showModal={
          showEmailModal ||
          showModal ||
          showSSOModal ||
          showProfileCreationModal
        }
      />
      {authenticated && !loginData?.loginDeactivated ? (
        <PrivateScreenNavigation />
      ) : (
        <PublicScreenNavigation />
      )}
    </NavigationContainer>
  );
};

export default RootNavigation;
