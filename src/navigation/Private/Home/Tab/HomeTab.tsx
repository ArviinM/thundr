import React from 'react';
import {Tab} from '../../../../constants/navigator.ts';
import Home from '../../../../screens/Private/Home/Home.tsx';
import WorkingInProgress from '../../../../screens/shared/WorkingInProgress.tsx';
import {COLORS} from '../../../../constants/commons.ts';
import {Image, TouchableOpacity, View} from 'react-native';
import {IMAGES} from '../../../../constants/images.ts';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const HomeTab = () => {
  const insets = useSafeAreaInsets();
  function Header() {
    return (
      <Image style={{transform: [{scale: 0.85}]}} source={IMAGES.headerLogo} />
    );
  }

  function HomeRightHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 10,

          // borderWidth: 1,
        }}>
        {/* Center icons vertically */}
        <TouchableOpacity style={{paddingHorizontal: 10}}>
          <Image source={IMAGES.bell} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={IMAGES.filter} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.white,
        },
        headerTintColor: COLORS.primary1,
        headerTitleStyle: {
          fontFamily: 'ClimateCrisis-Regular',
          fontWeight: '500',
        },
        tabBarStyle: {
          height: insets.bottom + 70,
        },
      }}>
      <Tab.Screen
        name="Profile"
        component={WorkingInProgress}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <Image source={focused ? IMAGES.profileOn : IMAGES.profileOff} />
          ),
        }}
      />
      <Tab.Screen
        name="Lightning Round"
        component={WorkingInProgress}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused ? IMAGES.lightningRoundOn : IMAGES.lightningRoundOff
              }
            />
          ),
        }}
      />

      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: () => <Header />,
          headerRight: () => <HomeRightHeader />,
          tabBarShowLabel: false,

          tabBarIcon: ({focused}) => (
            <Image
              source={focused ? IMAGES.lightningOn : IMAGES.lightningOff}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Possibles"
        component={WorkingInProgress}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <Image
              source={focused ? IMAGES.possiblesOn : IMAGES.possiblesOff}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Chat"
        component={WorkingInProgress}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <Image source={focused ? IMAGES.chatOn : IMAGES.chatOff} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
