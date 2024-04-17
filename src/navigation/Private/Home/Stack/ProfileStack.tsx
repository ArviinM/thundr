import React from 'react';

import {RootNavigationParams, Stack} from '../../../../constants/navigator.ts';
import Profile from '../../../../screens/Private/Profile/Profile.tsx';

import {COLORS} from '../../../../constants/commons.ts';
import {moderateScale} from '../../../../utils/utils.ts';
import EditProfile from '../../../../screens/Private/Profile/EditProfile.tsx';
import {Image, TouchableOpacity} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {IMAGES} from '../../../../constants/images.ts';
export const ProfileStack = () => {
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();

  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen
        name="Profile"
        component={Profile}
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
          headerLeft: props => (
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Image
                source={IMAGES.back}
                style={{width: 20, height: 20}}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          ),
          // headerRight: props => (
          //   <TouchableOpacity
          //     onPress={handleEditProfileSave}
          //     style={{
          //       paddingVertical: 6,
          //       paddingHorizontal: 16,
          //       backgroundColor: COLORS.primary1,
          //       borderRadius: 30,
          //     }}>
          //     <Text
          //       style={{
          //         fontFamily: 'Montserrat-SemiBold',
          //         color: COLORS.white,
          //       }}>
          //       Save
          //     </Text>
          //   </TouchableOpacity>
          // ),
        }}
      />
    </Stack.Navigator>
  );
};
