import React from 'react';

import {RootNavigationParams, Stack} from '../../../../constants/navigator.ts';

import {COLORS} from '../../../../constants/commons.ts';
import {moderateScale, scale} from '../../../../utils/utils.ts';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import WorkingInProgress from '../../../../screens/shared/WorkingInProgress.tsx';
import {ChevronLeftSmall} from '../../../../assets/images/ChevronLeftSmall.tsx';
import VerifyProfileInstructions from '../../../../screens/Private/FaceVerification/VerifyProfileInstructions.tsx';
import TakeAPhoto from '../../../../screens/Private/FaceVerification/TakeAPhoto.tsx';
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
          headerLeft: () => <HomeLeftHeader />,
          headerTransparent: true,
          headerTintColor: COLORS.white,
        }}
      />
      <Stack.Screen name="ReviewPhoto" component={WorkingInProgress} />
    </Stack.Navigator>
  );
};
