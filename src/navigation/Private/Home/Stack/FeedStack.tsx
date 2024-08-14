import React, {lazy, Suspense} from 'react';

import {Stack} from '../../../../constants/navigator.ts';

import {Loading} from '../../../../components/shared/Loading.tsx';
import {CardStyleInterpolators} from '@react-navigation/stack';
const Feed = lazy(
  // @ts-ignore
  () => import('../../../../screens/Private/Community/Feed.tsx'),
);
const LazyFeed = () => (
  <Suspense fallback={<Loading />}>
    <Feed />
  </Suspense>
);

export const FeedStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        component={LazyFeed}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
    </Stack.Navigator>
  );
};
