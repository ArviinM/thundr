import React from 'react';

import {RootNavigationParams, Stack} from '../../../../constants/navigator.ts';
import Profile from '../../../../screens/Private/Profile/Profile.tsx';

import {COLORS} from '../../../../constants/commons.ts';
import {moderateScale} from '../../../../utils/utils.ts';
import EditProfile from '../../../../screens/Private/Profile/EditProfile.tsx';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ChevronLeftSmall} from '../../../../assets/images/ChevronLeftSmall.tsx';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SettingsIcon} from '../../../../assets/images/SettingsIcon.tsx';
export const ProfileStack = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootNavigationParams>>();

  function HomeLeftHeaderSmall() {
    return (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}>
        <ChevronLeftSmall />
      </TouchableOpacity>
    );
  }

  function HomeRightHeader() {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('SettingsStack')}
        hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}>
        <SettingsIcon />
      </TouchableOpacity>
    );
  }

  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerLeft: () => <HomeLeftHeaderSmall />,
          headerRight: () => <HomeRightHeader />,
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
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerTitle: 'Edit Profile',
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
              onPress={() => navigation.navigate('Profile')}
              hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}>
              <ChevronLeftSmall />
            </TouchableOpacity>
          ),
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};
