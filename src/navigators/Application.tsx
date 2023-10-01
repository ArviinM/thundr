import React from 'react';

import { SafeAreaView, StatusBar } from 'react-native';

import Toast from 'react-native-toast-message';
import Spinner from '@atoms/Spinner/Spinner';

import {
   NavigationContainer,
   useNavigationContainerRef,
} from '@react-navigation/native';

import { useTheme } from '@hooks';
import { useFlipper } from '@react-navigation/devtools';

import MainNavigator from './Main';

const config = {
   screens: {
      StartUpStack: {
         screens: {
            StartUp: 'sso/:payload',
         },
      },
   },
};

const linking = {
   prefixes: ['ph.thundr.app://'],
   config,
};

// @refresh reset
const ApplicationNavigator = () => {
   const { Layout, darkMode, NavigationTheme } = useTheme();
   const { colors } = NavigationTheme;

   const navigationRef = useNavigationContainerRef();

   useFlipper(navigationRef);

   return (
      <>
         <SafeAreaView style={[Layout.fill, { backgroundColor: colors.card }]}>
            <NavigationContainer
               theme={NavigationTheme}
               ref={navigationRef}
               linking={linking}
            >
               <StatusBar
                  barStyle={darkMode ? 'light-content' : 'dark-content'}
               />
               <MainNavigator />
            </NavigationContainer>
            <Toast position="bottom" />
         </SafeAreaView>
      </>
   );
};

export default ApplicationNavigator;
