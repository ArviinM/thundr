import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {COLORS} from '../../constants/commons.ts';
// TODO: Temporary Loading Screen
export const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
      }}>
      <ActivityIndicator color={'#444242'} animating={true} size="small" />
    </View>
  );
};
