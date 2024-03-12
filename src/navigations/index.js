// React modules
import React, {useState, useEffect} from 'react';

// Third party libraries
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import notifee, {EventType} from '@notifee/react-native';

// Utils
import {navigationRef} from './tempNavigation';
import PublicScreenNavigation from './PublicScreenNavigation/PublicScreenNavigation';
import {useDispatch, useSelector} from 'react-redux';
import PrivateScreenNavigation from './PrivateScreenNavigation/PrivateScreenNavigation';
import Modal from '../composition/Modal/Modal';
import {GENERIC_ERROR} from '../utils/commons';
import {START_LOGIN_VIA_REFRESH_TOKEN} from '../ducks/Login/actionTypes';
import {UPDATE_NOTIFICATION_STATE} from '../ducks/Notification/actionTypes';

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

  const [hideSplash, setHideSplash] = useState(false);

  const config = {
    screens: {LoginOptionScreen: 'sso/:payload'},
  };

  const linking = {
    prefixes: ['ph.thundr.app://'],
    config,
  };

  useEffect(() => {
    let delayHandle;
    if (hideSplash) {
      delayHandle = setTimeout(() => {
        SplashScreen.hide();
      }, 1000);
    }
    return () => {
      clearTimeout(delayHandle);
    };
  }, [hideSplash]);

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
  }, [refreshToken, sub]);

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

          if (detail.notification.data.channelType === 'chat') {
            dispatch({
              type: UPDATE_NOTIFICATION_STATE,
              newState: {
                notificationData: {
                  fromNotification: true,
                  isMare: detail.notification.data.matchType === 'MARE',
                  targetSub: detail.notification.data.targetSub,
                },
              },
            });
            navigationRef.current.navigate('DashboardTabs', {
              screen: 'Messages',
            });
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
        setHideSplash(true);
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
