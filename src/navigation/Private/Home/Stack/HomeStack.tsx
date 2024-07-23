import React, {useRef} from 'react';

import {RootNavigationParams, Stack} from '../../../../constants/navigator.ts';

import {COLORS} from '../../../../constants/commons.ts';
import {moderateScale, scale} from '../../../../utils/utils.ts';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  DrawerActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {IMAGES} from '../../../../constants/images.ts';
import Home from '../../../../screens/Private/Home/Home.tsx';
import Notification from '../../../../screens/Private/Notification/Notification.tsx';
import useNotificationCountStore from '../../../../store/notificationCountStore.ts';
import Filters from '../../../../screens/Private/Filters/Filters.tsx';
export const HomeStack = () => {
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();

  const unreadNotifCount = useNotificationCountStore(
    state => state.unreadCount,
  );

  function HomeLeftHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: scale(-4),
        }}>
        {/* Center icons vertically */}
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer)}>
          <Image
            source={IMAGES.menu}
            style={{height: scale(24), width: scale(24)}}
          />
        </TouchableOpacity>
      </View>
    );
  }
  function Header() {
    return (
      <Image
        source={IMAGES.headerLogo}
        resizeMode={'contain'}
        style={{width: scale(130), height: scale(20)}}
      />
    );
  }

  function HomeRightHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: scale(-4),
        }}>
        {/* Center icons vertically */}
        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <Image
            source={IMAGES.bell}
            style={{height: scale(36), width: scale(36)}}
          />
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
      screenOptions={{headerTitleAlign: 'center', gestureEnabled: false}}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerLeft: () => <HomeLeftHeader />,
          headerTitle: () => <Header />,
          headerRight: () => <HomeRightHeader />,
          headerShown: true,
          headerStyle: {
            backgroundColor: COLORS.white,
          },
        }}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
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
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Home', {payload: ''})}
              style={{width: 30, height: 30}}>
              <Image
                source={IMAGES.back}
                style={{width: 20, height: 20}}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          ),
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
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Home', {payload: ''})}
              style={{width: 30, height: 30}}>
              <Image
                source={IMAGES.back}
                style={{width: 20, height: 20}}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          ),
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
