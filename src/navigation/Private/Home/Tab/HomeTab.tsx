import React, {useRef} from 'react';
import {Tab} from '../../../../constants/navigator.ts';
import Home from '../../../../screens/Private/Home/Home.tsx';
import WorkingInProgress from '../../../../screens/shared/WorkingInProgress.tsx';
import {COLORS} from '../../../../constants/commons.ts';
import {Image, TouchableOpacity, View} from 'react-native';
import {IMAGES} from '../../../../constants/images.ts';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {moderateScale, scale} from '../../../../utils/utils.ts';
import {ProfileStack} from '../Stack/ProfileStack.tsx';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {ChatTop} from '../Top/ChatTop.tsx';
import Possibles from '../../../../screens/Private/Possibles/Possibles.tsx';
import {LightningIcon} from '../../../../assets/images/tab_icons/LightningIcon.tsx';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useAuth} from '../../../../providers/Auth.tsx';
import FiltersBottomSheetModal from '../../../../components/Filters/FiltersBottomSheet.tsx';

export const HomeTab = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = () => bottomSheetRef.current?.present();
  const auth = useAuth();

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
          marginHorizontal: 12,
        }}>
        {/* Center icons vertically */}
        <TouchableOpacity>
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

  function HomeLeftHeader({isTint}: {isTint?: boolean}) {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 12,
        }}>
        {/* Center icons vertically */}
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer)}>
          <Image
            source={IMAGES.menu}
            style={{
              height: scale(24),
              width: scale(24),
              tintColor: isTint ? COLORS.white2 : undefined,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <Tab.Navigator
        initialRouteName={'Home'}
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: COLORS.white,
          },
          headerTintColor: COLORS.primary1,
          headerTitleStyle: {
            fontFamily: 'ClimateCrisis-Regular',
            fontWeight: '500',
            fontSize: moderateScale(20),
          },
          tabBarStyle: {
            height: insets.bottom + 70,
            backgroundColor: COLORS.white,
          },
        }}>
        <Tab.Screen
          name="ProfileStack"
          component={ProfileStack}
          options={{
            headerLeft: () => <HomeLeftHeader />,
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({focused}) => (
              <Image
                source={focused ? IMAGES.profileOn : IMAGES.profileOff}
                style={{height: scale(28), width: scale(28)}}
                resizeMode="contain"
              />
            ),
          }}
        />
        <Tab.Screen
          name="Lightning Round"
          component={WorkingInProgress}
          options={{
            headerLeft: () => <HomeLeftHeader />,
            tabBarShowLabel: false,
            tabBarIcon: ({focused}) => (
              <Image
                source={
                  focused ? IMAGES.lightningRoundOn : IMAGES.lightningRoundOff
                }
                style={{height: scale(38), width: scale(38)}}
                resizeMode="contain"
              />
            ),
          }}
        />

        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerLeft: () => <HomeLeftHeader />,
            headerTitle: () => <Header />,
            headerRight: () => <HomeRightHeader />,
            tabBarShowLabel: false,
            tabBarIcon: ({focused}) => <LightningIcon focused={focused} />,
          }}
        />

        <Tab.Screen
          name="The Possibles"
          component={Possibles}
          options={{
            headerTintColor: COLORS.white2,
            headerTransparent: true,
            headerLeft: () => <HomeLeftHeader isTint />,
            tabBarShowLabel: false,
            tabBarIcon: ({focused}) => (
              <Image
                source={focused ? IMAGES.possiblesOn : IMAGES.possiblesOff}
                style={{height: scale(30), width: scale(30)}}
                resizeMode="contain"
              />
            ),
          }}
        />

        <Tab.Screen
          name="Messages"
          component={ChatTop}
          options={{
            headerLeft: () => <HomeLeftHeader />,
            tabBarShowLabel: false,
            tabBarIcon: ({focused}) => (
              <Image
                source={focused ? IMAGES.chatOn : IMAGES.chatOff}
                style={{height: scale(30), width: scale(30)}}
                resizeMode="contain"
              />
            ),
          }}
        />
      </Tab.Navigator>
      {auth.authData && (
        <FiltersBottomSheetModal ref={bottomSheetRef} sub={auth.authData.sub} />
      )}
    </>
  );
};
