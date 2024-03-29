import React from 'react';
import {Stack} from '../../constants/navigator.ts';
import Home from '../../screens/Private/Home/Home.tsx';

export const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};
