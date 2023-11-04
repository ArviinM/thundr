// React modules
import React from 'react';
import {LogBox} from 'react-native';

// Third party libraries
import {RootSiblingParent} from 'react-native-root-siblings';
import {Provider} from 'react-redux';

// Utils
import RootNavigation from './src/navigations';
import store from './src/ducks/store';

LogBox.ignoreAllLogs();

function App() {
  return (
    <RootSiblingParent>
      <Provider store={store}>
        <RootNavigation />
      </Provider>
    </RootSiblingParent>
  );
}

export default App;
