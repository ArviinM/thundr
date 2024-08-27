import 'react-native-gesture-handler';
import React, {useEffect} from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

import Toast from 'react-native-toast-message';

import {AuthProvider} from './src/providers/Auth.tsx';
import toastConfig from './src/utils/toast/toastConfig.tsx';
import RootNavigation from './src/navigation';
import {asyncStoragePersister, queryClient} from './src/utils/queryClient.ts';
import messaging from '@react-native-firebase/messaging';
import {onMessageReceived} from './src/utils/notificationUtils.ts';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import {Platform, StatusBar} from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import {enableFreeze} from 'react-native-screens';
enableFreeze(true);

function App(): React.JSX.Element {
  useEffect(() => {
    if (Platform.OS !== 'ios') {
      NavigationBar.setBackgroundColorAsync('rgba(0,0,0,0.00)');
      NavigationBar.setPositionAsync('absolute');
      NavigationBar.setBehaviorAsync('inset-swipe');
    }
    return messaging().onMessage(onMessageReceived as any);
  }, []);

  return (
    <>
      <StatusBar
        backgroundColor={'#00000000'}
        translucent
        barStyle={'dark-content'}
      />
      <SafeAreaProvider>
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{persister: asyncStoragePersister}}>
          <AuthProvider>
            <ActionSheetProvider>
              <GestureHandlerRootView style={{flex: 1}}>
                <BottomSheetModalProvider>
                  <KeyboardProvider
                    statusBarTranslucent
                    navigationBarTranslucent>
                    <RootNavigation />
                  </KeyboardProvider>
                </BottomSheetModalProvider>
              </GestureHandlerRootView>
            </ActionSheetProvider>
          </AuthProvider>
        </PersistQueryClientProvider>
        <Toast config={toastConfig} />
      </SafeAreaProvider>
    </>
  );
}

export default App;
