import React from 'react';

import {RootNavigationParams, Stack} from '../../../../constants/navigator.ts';

import {COLORS} from '../../../../constants/commons.ts';
import {moderateScale, scale} from '../../../../utils/utils.ts';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import WorkingInProgress from '../../../../screens/shared/WorkingInProgress.tsx';
import {ChevronLeftSmall} from '../../../../assets/images/ChevronLeftSmall.tsx';
import VerifyProfileInstructions from '../../../../screens/Private/FaceVerification/VerifyProfileInstructions.tsx';
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
        headerStyle: {
          backgroundColor: COLORS.white,
        },
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
        }}
      />
      <Stack.Screen name="TakePhoto" component={WorkingInProgress} />
      <Stack.Screen name="ReviewPhoto" component={WorkingInProgress} />
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
