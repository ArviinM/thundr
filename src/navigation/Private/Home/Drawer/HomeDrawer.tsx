import React from 'react';
import {
  DrawerActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {Drawer, RootNavigationParams} from '../../../../constants/navigator.ts';
import {HomeTab} from '../Tab/HomeTab.tsx';
import DrawerContent from '../../../../components/Drawer/DrawerContent.tsx';
import WorkingInProgress from '../../../../screens/shared/WorkingInProgress.tsx';
import {COLORS} from '../../../../constants/commons.ts';
import {moderateScale, scale} from '../../../../utils/utils.ts';
import {Image, TouchableOpacity, View} from 'react-native';
import {IMAGES} from '../../../../constants/images.ts';
import Settings from '../../../../screens/Private/Settings/Settings.tsx';
import {SettingsStack} from '../Stack/SettingsStack.tsx';
import ThundrBolt from '../../../../screens/Private/ThundrBolt/ThundrBolt.tsx';

export const HomeDrawer = () => {
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();

  function HomeLeftHeader() {
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
            style={{height: scale(24), width: scale(24)}}
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <Drawer.Navigator
      drawerContent={DrawerContent}
      screenOptions={{
        swipeEnabled: false,
        swipeEdgeWidth: 0,

        headerLeft: () => <HomeLeftHeader />,
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
      }}>
      <Drawer.Screen
        name={'HomeTab'}
        component={HomeTab}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name={'ThundrBolt'}
        component={ThundrBolt}
        options={{title: 'Thundr Bolt'}}
      />
      <Drawer.Screen name={'ThundrMachi'} component={WorkingInProgress} />
      <Drawer.Screen
        name={'SettingsStack'}
        component={SettingsStack}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};
