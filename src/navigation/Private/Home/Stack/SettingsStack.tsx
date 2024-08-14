import React from 'react';

import {RootNavigationParams, Stack} from '../../../../constants/navigator.ts';

import {COLORS} from '../../../../constants/commons.ts';
import {moderateScale, scale} from '../../../../utils/utils.ts';
import {Image, TouchableOpacity} from 'react-native';
import {
  DrawerActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {IMAGES} from '../../../../constants/images.ts';
import Settings from '../../../../screens/Private/Settings/Settings.tsx';
import Terms from '../../../../screens/Public/Login/Terms.tsx';
import PasswordNewValidation from '../../../../screens/Public/Login/PasswordNewValidation.tsx';
import PasswordResetConfirmed from '../../../../screens/Public/Login/PasswordResetConfirmed.tsx';
import CustomerDeactivate from '../../../../screens/Private/Deactivate/CustomerDeactivate.tsx';
import {ChevronLeftSmall} from '../../../../assets/images/ChevronLeftSmall.tsx';
export const SettingsStack = () => {
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();

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

  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerLeft: () => <HomeLeftHeaderSmall />,
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
        }}
      />
      <Stack.Group
        screenOptions={{
          presentation: 'modal',
          headerShown: false,
          gestureEnabled: true,
        }}>
        <Stack.Screen name="Terms" component={Terms} />
      </Stack.Group>
      <Stack.Screen
        name="PasswordNewValidation"
        component={PasswordNewValidation}
        options={{
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
              <Image
                source={IMAGES.back}
                style={{width: 20, height: 20}}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          ),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PasswordResetConfirmed"
        component={PasswordResetConfirmed}
        options={{
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
              <Image
                source={IMAGES.back}
                style={{width: 20, height: 20}}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          ),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CustomerDeactivate"
        component={CustomerDeactivate}
        options={{
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
              <Image
                source={IMAGES.back}
                style={{width: 20, height: 20}}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          ),
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
