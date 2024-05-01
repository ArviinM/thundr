import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, View} from 'react-native';

const Notification = () => {
  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} style={{flex: 1}}>
      <View>
        <Text>Notification - WIP</Text>
      </View>
    </SafeAreaView>
  );
};

export default Notification;
