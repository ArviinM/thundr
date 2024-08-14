import React, {lazy, Suspense} from 'react';

import {RootNavigationParams, Stack} from '../../../../constants/navigator.ts';

import {COLORS} from '../../../../constants/commons.ts';
import {
  animationConfig,
  moderateScale,
  scale,
} from '../../../../utils/utils.ts';
import EditProfile from '../../../../screens/Private/Profile/EditProfile.tsx';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ChevronLeftSmall} from '../../../../assets/images/ChevronLeftSmall.tsx';
import {
  CardStyleInterpolators,
  StackNavigationProp,
} from '@react-navigation/stack';
import {SettingsIcon} from '../../../../assets/images/SettingsIcon.tsx';
import {Loading} from '../../../../components/shared/Loading.tsx';

const Profile = lazy(
  // @ts-ignore
  () => import('../../../../screens/Private/Profile/Profile.tsx'),
);

const LazyProfile = () => (
  <Suspense fallback={<Loading />}>
    <Profile />
  </Suspense>
);

export const ProfileStack = () => {
  const navigation = useNavigation<StackNavigationProp<RootNavigationParams>>();

  function HomeLeftHeaderSmall() {
    return (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}
        style={{paddingHorizontal: scale(20)}}>
        <ChevronLeftSmall />
      </TouchableOpacity>
    );
  }

  function HomeRightHeader() {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('SettingsStack')}
        hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}
        style={{paddingHorizontal: scale(20)}}>
        <SettingsIcon />
      </TouchableOpacity>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        transitionSpec: {
          open: animationConfig,
          close: animationConfig,
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
        name="Profile"
        component={LazyProfile}
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
