import React from 'react';

import {RootNavigationParams, Stack} from '../../../../constants/navigator.ts';
import Profile from '../../../../screens/Private/Profile/Profile.tsx';

import {COLORS} from '../../../../constants/commons.ts';
import {moderateScale, scale} from '../../../../utils/utils.ts';
import EditProfile from '../../../../screens/Private/Profile/EditProfile.tsx';
import {Image, TouchableOpacity, View} from 'react-native';
import {
  DrawerActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {IMAGES} from '../../../../constants/images.ts';
import Advocacy from '../../../../screens/Private/Advocacy/Advocacy.tsx';
import AdvocacyDonate from '../../../../screens/Private/Advocacy/AdvocacyDonate.tsx';
export const AdvocacyStack = () => {
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();

  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen
        name="Advocacy"
        component={Advocacy}
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
        }}
      />
      <Stack.Screen
        name="AdvocacyDonate"
        component={AdvocacyDonate}
        options={{
          headerTitle: 'Advocacy',
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
            <TouchableOpacity onPress={() => navigation.navigate('Advocacy')}>
              <Image
                source={IMAGES.back}
                style={{width: 20, height: 20, paddingHorizontal: scale(20)}}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};
