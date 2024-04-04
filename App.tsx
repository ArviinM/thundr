import React from 'react';
import RootNavigation from './src/navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AuthProvider} from './src/providers/Auth.tsx';
import {asyncStoragePersister, queryClient} from './src/utils/queryClient.ts';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {KeyboardProvider} from 'react-native-keyboard-controller';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
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
    </SafeAreaProvider>
  );
}

export default App;
