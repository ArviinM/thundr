import React from 'react';
import {RootNavigationParams, Stack} from '../../../../constants/navigator.ts';
import Notification from '../../../../screens/Private/Notification/Notification.tsx';
import {COLORS} from '../../../../constants/commons.ts';
import {scale} from '../../../../utils/utils.ts';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ChevronLeftSmall} from '../../../../assets/images/ChevronLeftSmall.tsx';
import {useNavigation} from '@react-navigation/native';
import {CommunityTop} from '../Top/CommunityTop.tsx';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ProfileStack} from './ProfileStack.tsx';
import {SearchIcon} from '../../../../assets/images/header_icons/SearchIcon.tsx';
import {ProfileIcon} from '../../../../assets/images/header_icons/ProfileIcon.tsx';
import {BellIcon} from '../../../../assets/images/header_icons/BellIcon.tsx';
import {SettingsStack} from './SettingsStack.tsx';
import {HeaderThundrLogo} from '../../../../assets/images/HeaderThundrLogo.tsx';
import useNotificationCountStore from '../../../../store/notificationCountStore.ts';

export const CommunityStack = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootNavigationParams>>();

  const unreadNotifCount = useNotificationCountStore(
    state => state.unreadCount,
  );

  function HomeLeftHeaderSmall() {
    return (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}>
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
          marginHorizontal: 12,
          alignItems: 'center',
          gap: scale(10),
        }}>
        {/* Center icons vertically */}
        {/*<TouchableOpacity onPress={() => navigation.push('ProfileStack')}>*/}
        {/*  <SearchIcon />*/}
        {/*</TouchableOpacity>*/}
        <TouchableOpacity
          onPress={() => navigation.push('Notification')}
          hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}>
          <BellIcon />
          {unreadNotifCount > 0 && (
            <View style={styles.indicator}>
              <Text style={styles.indicatorText}>
                {unreadNotifCount.toString()}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.push('ProfileStack')}
          hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}>
          <ProfileIcon />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <Stack.Navigator initialRouteName={'CommunityTop'}>
      <Stack.Screen
        name="CommunityTop"
        component={CommunityTop}
        options={{
          headerLeft: () => <Header />,
          headerTitle: () => <View />,
          headerRight: () => <HomeRightHeader />,
          headerShown: true,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="Notification"
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
        name="ProfileStack"
        component={ProfileStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={{headerShown: false}}
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
