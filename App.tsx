import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BootSplash from 'react-native-bootsplash';

function App(): React.JSX.Element {
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({fade: true});
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Welcome to the new Thundr App now made in TypeScript</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
