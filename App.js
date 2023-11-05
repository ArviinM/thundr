// React modules
import React from 'react';
import {LogBox} from 'react-native';

// Third party libraries
import {RootSiblingParent} from 'react-native-root-siblings';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

// Utils
import RootNavigation from './src/navigations';
import store, {persistor} from './src/ducks/store';

LogBox.ignoreAllLogs();

function App() {
  return (
    <RootSiblingParent>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootNavigation />
        </PersistGate>
      </Provider>
    </RootSiblingParent>
  );
}

export default App;
