import React, {useRef} from 'react';

import {RootNavigationParams, Stack} from '../../../../constants/navigator.ts';

import {COLORS} from '../../../../constants/commons.ts';
import {moderateScale, scale} from '../../../../utils/utils.ts';
import {Image, TouchableOpacity, View} from 'react-native';
import {
  DrawerActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {IMAGES} from '../../../../constants/images.ts';
import Home from '../../../../screens/Private/Home/Home.tsx';
import Notification from '../../../../screens/Private/Notification/Notification.tsx';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import FiltersBottomSheetModal from '../../../../components/Filters/FiltersBottomSheet.tsx';
import {useAuth} from '../../../../providers/Auth.tsx';
export const HomeStack = () => {
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const auth = useAuth();
  const handlePresentModalPress = () => bottomSheetRef.current?.present();
  function HomeLeftHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: scale(-4),
        }}>
        {/* Center icons vertically */}
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer)}>
          <Image
            source={IMAGES.menu}
            style={{height: scale(24), width: scale(24)}}
          />
        </TouchableOpacity>
      </View>
    );
  }
  function Header() {
    return (
      <Image
        source={IMAGES.headerLogo}
        resizeMode={'contain'}
        style={{width: scale(130), height: scale(20)}}
      />
    );
  }

  function HomeRightHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: scale(-4),
        }}>
        {/* Center icons vertically */}
        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <Image
            source={IMAGES.bell}
            style={{height: scale(36), width: scale(36)}}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePresentModalPress}>
          <Image
            source={IMAGES.filter}
            style={{height: scale(36), width: scale(36)}}
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerLeft: () => <HomeLeftHeader />,
            headerTitle: () => <Header />,
            headerRight: () => <HomeRightHeader />,
            headerShown: true,
            headerStyle: {
              backgroundColor: COLORS.white,
            },
          }}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
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
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Home', {payload: null})}
                style={{width: 30, height: 30}}>
                <Image
                  source={IMAGES.back}
                  style={{width: 20, height: 20}}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack.Navigator>

      {auth.authData && (
        <FiltersBottomSheetModal ref={bottomSheetRef} sub={auth.authData.sub} />
      )}
    </>
  );
};
