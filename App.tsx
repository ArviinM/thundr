import React from 'react';
import RootNavigation from './src/navigation';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {AuthProvider} from './src/providers/Auth.tsx';
import Toast from 'react-native-toast-message';
import {asyncStoragePersister, queryClient} from './src/utils/queryClient.ts';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import toastConfig from './src/utils/toast/toastConfig.tsx';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{persister: asyncStoragePersister}}>
        <AuthProvider>
          <GestureHandlerRootView style={{flex: 1}}>
            <KeyboardProvider>
              <RootNavigation />
            </KeyboardProvider>
          </GestureHandlerRootView>
        </AuthProvider>
      </PersistQueryClientProvider>
      <Toast config={toastConfig} />
    </SafeAreaProvider>
  );
}

export default App;
