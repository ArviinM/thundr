import 'react-native-gesture-handler';
import React, {useEffect} from 'react';

import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
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

function App(): React.JSX.Element {

  // useEffect(() => {
  //   return messaging().onMessage(onMessageReceived as any);
  // }, []);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{persister: asyncStoragePersister}}>
        <AuthProvider>
          <GestureHandlerRootView style={{flex: 1}}>
            <BottomSheetModalProvider>
              <KeyboardProvider>
                <RootNavigation />
              </KeyboardProvider>
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </AuthProvider>
      </PersistQueryClientProvider>
      <Toast config={toastConfig} />
    </SafeAreaProvider>
  );
}

export default App;
