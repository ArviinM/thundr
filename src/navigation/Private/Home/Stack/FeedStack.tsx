import React, {lazy, Suspense} from 'react';

import {RootNavigationParams, Stack} from '../../../../constants/navigator.ts';

import {Loading} from '../../../../components/shared/Loading.tsx';
import Notification from '../../../../screens/Private/Notification/Notification.tsx';
import {COLORS} from '../../../../constants/commons.ts';
import {scale} from '../../../../utils/utils.ts';
import {TouchableOpacity} from 'react-native';
import {ChevronLeftSmall} from '../../../../assets/images/ChevronLeftSmall.tsx';
import {NavigationProp, useNavigation} from '@react-navigation/native';

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

  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();

  function HomeLeftHeader() {
    return (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}>
        <ChevronLeftSmall />
      </TouchableOpacity>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        component={LazyFeed}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{
          headerTitle: 'Notifications',
          headerLeft: () => <HomeLeftHeader />,
          headerStyle: {
            backgroundColor: COLORS.white,
          },
          headerTitleStyle: {
            fontFamily: 'Montserrat-Bold',
            fontSize: scale(14),
          },
          headerShown: true,
          headerTitleAlign: 'center',
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};
