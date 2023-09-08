import React from 'react';
import { Example, KeyFeatures } from '../screens';
import { createStackNavigator } from '@react-navigation/stack';

/**
 * TODO: Remove this before push
 */

import BasicButton from '@atoms/Buttons/Basic';

const SamplePage: React.FC = () => {
  return <BasicButton title='Hello World'/>
}

const Stack = createStackNavigator();

// @refresh reset
const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={KeyFeatures} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
