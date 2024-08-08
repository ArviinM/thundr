import React, {lazy, Suspense} from 'react';

import {Stack} from '../../../../constants/navigator.ts';

import {Loading} from '../../../../components/shared/Loading.tsx';

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
  // const navigation = useNavigation<NavigationProp<RootNavigationParams>>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        component={LazyFeed}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
