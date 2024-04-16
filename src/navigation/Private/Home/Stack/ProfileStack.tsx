import React from 'react';

import {Stack} from '../../../../constants/navigator.ts';
import Profile from '../../../../screens/Private/Profile/Profile.tsx';
import WorkingInProgress from '../../../../screens/shared/WorkingInProgress.tsx';
import {COLORS} from '../../../../constants/commons.ts';
import {moderateScale} from '../../../../utils/utils.ts';
import EditProfile from '../../../../screens/Private/Profile/EditProfile.tsx';
import {Image, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {IMAGES} from '../../../../constants/images.ts';
export const ProfileStack = () => {
  const navigation = useNavigation();

  const handleEditProfileSave = () => {
    // how do i get the data to save it???
  };
  return (
    <Stack.Navigator>
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
            <TouchableOpacity onPress={() => navigation.goBack()}>
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
