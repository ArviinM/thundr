import React from 'react';

import {RootNavigationParams, Stack} from '../../../../constants/navigator.ts';

import {COLORS} from '../../../../constants/commons.ts';
import {
  animationConfig,
  moderateScale,
  scale,
} from '../../../../utils/utils.ts';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ChevronLeftSmall} from '../../../../assets/images/ChevronLeftSmall.tsx';
import VerifyProfileInstructions from '../../../../screens/Private/FaceVerification/VerifyProfileInstructions.tsx';
import TakeAPhoto from '../../../../screens/Private/FaceVerification/TakeAPhoto.tsx';
import ReviewPhoto from '../../../../screens/Private/FaceVerification/ReviewPhoto.tsx';
import {ChevronLeftSmallWhite} from '../../../../assets/images/ChevronLeftSmallWhite.tsx';
import {
  CardStyleInterpolators,
  StackNavigationProp,
} from '@react-navigation/stack';
export const FaceVerificationStack = () => {
  const navigation = useNavigation<StackNavigationProp<RootNavigationParams>>();

  function HomeLeftHeader() {
    return (
      <TouchableOpacity
        onPress={() => navigation.pop()}
        hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}
        style={{paddingHorizontal: scale(20)}}>
        <ChevronLeftSmall />
      </TouchableOpacity>
    );
  }

  function HomeLeftHeaderWhite() {
    return (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}
        style={{paddingHorizontal: scale(20)}}>
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

        transitionSpec: {
          open: animationConfig,
          close: animationConfig,
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
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
          headerTitleStyle: {
            fontFamily: 'Montserrat-Bold',
            fontSize: scale(14),
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
          headerTitleStyle: {
            fontFamily: 'Montserrat-Bold',
            fontSize: scale(14),
          },
        }}
      />
      <Stack.Screen
        name="ReviewPhoto"
        component={ReviewPhoto}
        options={{
          headerTitle: 'Verify Profile',
          headerBackTitleVisible: false,
          // headerLeft: () => <HomeLeftHeader />,
          headerStyle: {
            backgroundColor: COLORS.white,
          },
          headerTitleStyle: {
            fontFamily: 'Montserrat-Bold',
            fontSize: scale(14),
          },
        }}
      />
    </Stack.Navigator>
  );
};
