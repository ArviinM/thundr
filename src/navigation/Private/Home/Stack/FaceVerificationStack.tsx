import React from 'react';

import {RootNavigationParams, Stack} from '../../../../constants/navigator.ts';

import {COLORS} from '../../../../constants/commons.ts';
import {moderateScale} from '../../../../utils/utils.ts';
import {TouchableOpacity} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ChevronLeftSmall} from '../../../../assets/images/ChevronLeftSmall.tsx';
import VerifyProfileInstructions from '../../../../screens/Private/FaceVerification/VerifyProfileInstructions.tsx';
import TakeAPhoto from '../../../../screens/Private/FaceVerification/TakeAPhoto.tsx';
import ReviewPhoto from '../../../../screens/Private/FaceVerification/ReviewPhoto.tsx';
import {ChevronLeftSmallWhite} from '../../../../assets/images/ChevronLeftSmallWhite.tsx';
export const FaceVerificationStack = () => {
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

  function HomeLeftHeaderWhite() {
    return (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}>
        <ChevronLeftSmallWhite />
      </TouchableOpacity>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={'VerifyProfile'}
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'Montserrat-Bold',
          fontSize: moderateScale(16),
        },
      }}>
      <Stack.Screen
        name="VerifyProfile"
        component={VerifyProfileInstructions}
        options={{
          headerTitle: 'Verify Profile',
          headerLeft: () => <HomeLeftHeader />,
          headerStyle: {
            backgroundColor: COLORS.white,
          },
        }}
      />
      <Stack.Screen
        name="TakeAPhoto"
        component={TakeAPhoto}
        options={{
          headerTitle: 'Take a Photo',
          headerLeft: () => <HomeLeftHeaderWhite />,
          headerTransparent: true,
          headerTintColor: COLORS.white,
        }}
      />
      <Stack.Screen
        name="ReviewPhoto"
        component={ReviewPhoto}
        options={{
          headerTitle: 'Verify Profile',
          headerBackVisible: false,
          // headerLeft: () => <HomeLeftHeader />,
          headerStyle: {
            backgroundColor: COLORS.white,
          },
        }}
      />
    </Stack.Navigator>
  );
};
