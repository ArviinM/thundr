import React from 'react';
import { KeyFeatures } from '../screens';
import { createStackNavigator } from '@react-navigation/stack';

type RootStackParamList = {
  KeyFeatures: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

// @refresh reset
const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="KeyFeatures" component={KeyFeatures} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
