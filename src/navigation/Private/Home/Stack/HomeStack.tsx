import React, {lazy, Suspense} from 'react';

import {RootNavigationParams, Stack} from '../../../../constants/navigator.ts';

import {COLORS} from '../../../../constants/commons.ts';
import {
  animationConfig,
  moderateScale,
  scale,
} from '../../../../utils/utils.ts';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {IMAGES} from '../../../../constants/images.ts';
import Notification from '../../../../screens/Private/Notification/Notification.tsx';
import useNotificationCountStore from '../../../../store/notificationCountStore.ts';
import Filters from '../../../../screens/Private/Filters/Filters.tsx';
import {Loading} from '../../../../components/shared/Loading.tsx';
import {ChevronLeftSmall} from '../../../../assets/images/ChevronLeftSmall.tsx';
import {
  CardStyleInterpolators,
  StackNavigationProp,
} from '@react-navigation/stack';
import {HeaderThundrLogo} from '../../../../assets/images/HeaderThundrLogo.tsx';
import {BellIcon} from '../../../../assets/images/header_icons/BellIcon.tsx';

// @ts-ignore
const Home = lazy(() => import('../../../../screens/Private/Home/Home.tsx'));
const LazyHome = () => (
  <Suspense fallback={<Loading />}>
    <Home />
  </Suspense>
);

export const HomeStack = () => {
  const navigation = useNavigation<StackNavigationProp<RootNavigationParams>>();

  const unreadNotifCount = useNotificationCountStore(
    state => state.unreadCount,
  );

  function HomeLeftHeaderSmall() {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Home', {payload: ''})}
        // onPress={() => navigation.goBack()}
        hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}
        style={{paddingHorizontal: scale(20)}}>
        <ChevronLeftSmall />
      </TouchableOpacity>
    );
  }

  function Header() {
    return <HeaderThundrLogo />;
  }

  function HomeRightHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: scale(-4),
          alignItems: 'center',
          paddingHorizontal: scale(20),
        }}>
        {/* Center icons vertically */}
        <TouchableOpacity onPress={() => navigation.push('HomeNotification')}>
          <BellIcon />
          {unreadNotifCount > 0 && (
            <View style={styles.indicator}>
              <Text style={styles.indicatorText}>
                {unreadNotifCount.toString()}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Filters')}>
          <Image
            source={IMAGES.filter}
            style={{height: scale(36), width: scale(36)}}
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        gestureEnabled: false,
        transitionSpec: {
          open: animationConfig,
          close: animationConfig,
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
        name="Home"
        component={LazyHome}
        options={{
          headerTitle: () => <Header />,
          headerRight: () => <HomeRightHeader />,
          headerShown: true,
          headerStyle: {
            backgroundColor: COLORS.white,
          },
        }}
      />
      <Stack.Screen
        name="HomeNotification"
        component={Notification}
        options={{
          headerTitle: 'Notifications',
          headerLeft: () => <HomeLeftHeaderSmall />,
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

      <Stack.Screen
        name="Filters"
        component={Filters}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: COLORS.white,
          },
          headerTintColor: COLORS.primary1,
          headerTitleStyle: {
            fontFamily: 'ClimateCrisis-Regular',
            fontWeight: '500',
            fontSize: moderateScale(20),
          },
          headerLeft: () => <HomeLeftHeaderSmall />,
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: COLORS.primary1,
    width: scale(12),
    height: scale(12),
    borderRadius: 8, // Updated from 10 for a softer circle
    position: 'absolute',
    // top: scale(18),
    right: scale(1),
    justifyContent: 'center', // Center the text horizontally
    alignItems: 'center', // Center the text vertically
  },
  indicatorText: {
    color: 'white', // Ensure good contrast
    fontSize: scale(7), // Adjust font size for readability
    fontWeight: 'bold', // Consider bold for emphasis
  },
});
