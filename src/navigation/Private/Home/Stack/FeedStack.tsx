import React, {lazy, Suspense} from 'react';

import {Stack} from '../../../../constants/navigator.ts';

import {COLORS} from '../../../../constants/commons.ts';
import {scale} from '../../../../utils/utils.ts';
import {StyleSheet} from 'react-native';
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
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
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

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: COLORS.primary1,
    width: 16,
    height: 16,
    borderRadius: 8, // Updated from 10 for a softer circle
    position: 'absolute',
    // top: scale(18),
    right: scale(1),
    justifyContent: 'center', // Center the text horizontally
    alignItems: 'center', // Center the text vertically
  },
  indicatorText: {
    color: 'white', // Ensure good contrast
    fontSize: scale(10), // Adjust font size for readability
    fontWeight: 'bold', // Consider bold for emphasis
  },
});
