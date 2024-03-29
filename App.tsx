import React from 'react';
import RootNavigation from './src/navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AuthProvider} from './src/providers/Auth.tsx';

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <RootNavigation />
      </SafeAreaProvider>
    </AuthProvider>
  );
}

export default App;
