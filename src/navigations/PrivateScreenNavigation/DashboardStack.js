/**
 *
 * @format
 */

// React modules
import React from 'react';
import {TouchableOpacity, View} from 'react-native';

// Third party libraries
import {
  DrawerActions,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';

// Components
import Dashboard from '../../screens/private/Dashboard/Dashboard';
import Image from '../../components/Image/Image';
import Text from '../../components/Text/Text';
import MatchFound from '../../screens/private/MatchFound/MatchFound';
import Messages from '../../screens/private/Messages/Messages';
import ChatScreen from '../../screens/private/ChatScreen/ChatScreen';
import DrawerContent from './DrawerContent';

// Utils
import {scale, verticalScale} from '../../utils/commons';
import {DASHBOARD_ASSET_URI, GLOBAL_ASSET_URI} from '../../utils/images';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const UnderConstruction = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text size={30} customStyle={{textAlign: 'center'}} color="#E33C59">
        This page is under construction.
      </Text>
    </View>
  );
};

const DashboardTabs = ({route, navigation}) => {
  const focusedRoute = getFocusedRouteNameFromRoute(route);

  return (
    <Tab.Navigator
      initialRouteName="DashboardTab"
      screenOptions={{
        gestureEnabled: false,
        swipeEnabled: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#D8DCDD',
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarItemStyle: {
          paddingVertical: verticalScale(25),
        },
      }}>
      <Tab.Screen
        name="Profile"
        component={UnderConstruction}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => {
            return focusedRoute === 'Profile' ? (
              <Image
                source={DASHBOARD_ASSET_URI.SELECTED_PROFILE_ICON}
                height={40}
                width={40}
              />
            ) : (
              <Image
                source={DASHBOARD_ASSET_URI.PROFILE_ICON}
                height={25}
                width={25}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => {
            return focusedRoute === 'Messages' ? (
              <Image
                source={DASHBOARD_ASSET_URI.SELECTED_MESSAGE_ICON}
                height={40}
                width={40}
              />
            ) : (
              <Image
                source={DASHBOARD_ASSET_URI.MESSAGE_ICON}
                height={25}
                width={25}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="DashboardTab"
        component={Dashboard}
        options={{
          tabBarButton: () => {
            focusedRoute !== 'DashboardTab' ? (
              <Image
                source={DASHBOARD_ASSET_URI.THUNDR}
                height={70}
                width={70}
                customStyle={{bottom: verticalScale(20)}}
              />
            ) : null;
          },
          tabBarLabel: '',
          // tabBarIcon: () => {
          //   return (
          //     focusedRoute === 'DashboardTab' && (
          //       <Image
          //         source={DASHBOARD_ASSET_URI.THUNDR}
          //         height={70}
          //         width={70}
          //         customStyle={{bottom: verticalScale(20)}}
          //       />
          //     )
          //   );
          // },
        }}
      />
      <Tab.Screen
        name="Stars"
        component={UnderConstruction}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => {
            return focusedRoute === 'Stars' ? (
              <Image
                source={DASHBOARD_ASSET_URI.SELECTED_STARS_ICON}
                height={40}
                width={40}
              />
            ) : (
              <Image
                source={DASHBOARD_ASSET_URI.STARS_ICON}
                height={25}
                width={25}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="FlashThundr"
        component={UnderConstruction}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => {
            return focusedRoute === 'FlashThundr' ? (
              <Image
                source={DASHBOARD_ASSET_URI.SELECTED_FLASH_THUNDR_ICON}
                height={40}
                width={40}
              />
            ) : (
              <Image
                source={DASHBOARD_ASSET_URI.FLASH_THUNDR_ICON}
                height={25}
                width={25}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const DashboardNavigations = () => {
  const navigation = useNavigation();
  const renderLeftComponent = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <Image
          source={DASHBOARD_ASSET_URI.HAMBURGER_ICON}
          height={25}
          width={25}
          customStyle={{left: scale(20), justifyContent: 'center'}}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Drawer.Navigator
      swipeEdgeWidth={0}
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        swipeEnabled: false,
        swipeEdgeWidth: 0,
        gestureEnabled: false,
        headerStyle: {
          backgroundColor: '#fff',
          shadowOpacity: 0,
        },
        headerTitleAlign: 'center',
        headerTintColor: '#FFFFFF',
        headerTitle: () => {
          return (
            <Image
              source={GLOBAL_ASSET_URI.THUNDR_ICON}
              height={110}
              width={110}
            />
          );
        },
        headerTitleStyle: {
          color: '#FFFFFF',
          fontWeight: 700,
          fontSize: 19,
        },
        headerLeft: () => renderLeftComponent(),
      }}>
      <Drawer.Screen name="DashboardTabs" component={DashboardTabs} />
      <Drawer.Screen name="MatchFound" component={MatchFound} />
      <Drawer.Screen name="ChatScreen" component={ChatScreen} />
    </Drawer.Navigator>
  );
};

export default DashboardNavigations;
