import React from 'react';
import RootNavigation from './src/navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AuthProvider} from './src/providers/Auth.tsx';
import {asyncStoragePersister, queryClient} from './src/utils/queryClient.ts';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{persister: asyncStoragePersister}}>
        <AuthProvider>
          <RootNavigation />
        </AuthProvider>
      </PersistQueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;
