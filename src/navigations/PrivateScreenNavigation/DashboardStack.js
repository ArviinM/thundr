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
import {useSelector} from 'react-redux';
import ProfileStack from './ProfileStack';
import ChatStack from './ChatStack';

// Components
import Dashboard from '../../screens/private/Dashboard/Dashboard';
import Image from '../../components/Image/Image';
import Text from '../../components/Text/Text';
import MatchFound from '../../screens/private/MatchFound/MatchFound';
import DrawerContent from './DrawerContent';
import AdvocacyStack from './AdvocacyStack';
import FiltersScreen from '../../screens/private/FiltersScreen/FiltersScreen';
import ThunderBoltStack from './ThunderBoltStack';
import ThePossiblesStack from './ThePossiblesStack';
import SettingsStack from './SettingsStack';

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
  const {unreadMessages} = useSelector(state => state.dashboard);
  const focusedRoute = getFocusedRouteNameFromRoute(route);

  const totalUnreadMessage = unreadMessages.filter(
    item => item.isRead === 0,
  ).length;

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
        component={ProfileStack}
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
        component={ChatStack}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => {
            return focusedRoute === 'Messages' ? (
              <>
                {totalUnreadMessage > 0 && (
                  <View
                    style={{
                      position: 'absolute',
                      backgroundColor: '#E23051',
                      zIndex: 1,
                      bottom: verticalScale(12),
                      height: verticalScale(20),
                      width: scale(25),
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 30,
                      left: scale(35),
                    }}>
                    <Text color="#fff" weight={700} size={15}>
                      {totalUnreadMessage}
                    </Text>
                  </View>
                )}
                <Image
                  source={DASHBOARD_ASSET_URI.SELECTED_MESSAGE_ICON}
                  height={40}
                  width={40}
                />
              </>
            ) : (
              <>
                {totalUnreadMessage > 0 && (
                  <View
                    style={{
                      position: 'absolute',
                      backgroundColor: '#E23051',
                      zIndex: 1,
                      bottom: verticalScale(5),
                      height: verticalScale(20),
                      width: scale(25),
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 30,
                      left: scale(35),
                    }}>
                    <Text color="#fff" weight={700} size={15}>
                      {totalUnreadMessage}
                    </Text>
                  </View>
                )}
                <Image
                  source={DASHBOARD_ASSET_URI.MESSAGE_ICON}
                  height={25}
                  width={25}
                />
              </>
            );
          },
        }}
      />
      <Tab.Screen
        name="DashboardTab"
        component={Dashboard}
        options={{
          tabBarButton: () => {
            return focusedRoute && focusedRoute !== 'DashboardTab' ? (
              <TouchableOpacity
                onPress={() =>
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'DashboardTabs'}],
                  })
                }>
                <Image
                  source={DASHBOARD_ASSET_URI.THUNDR}
                  height={70}
                  width={70}
                  customStyle={{bottom: verticalScale(30)}}
                />
              </TouchableOpacity>
            ) : null;
          },
          tabBarLabel: '',
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
      <Drawer.Screen name="Filters" component={FiltersScreen} />
      <Drawer.Screen name="ThunderBolt" component={ThunderBoltStack} />
      <Drawer.Screen name="Advocacy" component={AdvocacyStack} />
      <Drawer.Screen name="ThePossibles" component={ThePossiblesStack} />
      <Drawer.Screen name="Settings" component={SettingsStack} />
    </Drawer.Navigator>
  );
};

export default DashboardNavigations;
