/**
 *
 * @format
 */

// React modules
import React from 'react';
import {TouchableOpacity} from 'react-native';

// Third party libraries
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

// Components
import Image from '../../components/Image/Image';
import SettingsMainScreen from '../../screens/private/SettingsMainScreen/SettingsMainScreen';
import SecurityAndPrivacy from '../../screens/private/SecurityAndPrivacy/SecurityAndPrivacy';
import ContactUs from '../../screens/private/ContactUs/ContactUs';

// Ducks
import {START_LOGOUT} from '../../ducks/Login/actionTypes';

// Utils
import {scale} from '../../utils/commons';
import {GLOBAL_ASSET_URI} from '../../utils/images';
import NotificationSettings from '../../screens/private/NotificationSettings/NotificationSettings';

const Stack = createStackNavigator();

const SettingsStack = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const renderBackIcon = shouldLogout => {
    return (
      <TouchableOpacity
        onPress={() =>
          shouldLogout ? dispatch({type: START_LOGOUT}) : navigation.goBack()
        }>
        <Image
          source={GLOBAL_ASSET_URI.BACK_ICON}
          height={25}
          width={25}
          customStyle={{left: scale(20), justifyContent: 'center'}}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Stack.Navigator
      initialRouteName="SettingsMainScreen"
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
        headerStyle: {
          backgroundColor: '#fff',
          shadowOpacity: 0,
        },
        headerTitleAlign: 'center',
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          color: '#FFFFFF',
          fontWeight: 700,
          fontSize: 19,
        },
        headerLeft: () => renderBackIcon(),
      }}>
      <Stack.Screen name="SettingsMainScreen" component={SettingsMainScreen} />
      <Stack.Screen
        name="NotificationSettings"
        component={NotificationSettings}
      />
      <Stack.Screen name="SecurityAndPrivacy" component={SecurityAndPrivacy} />
      <Stack.Screen name="ContactUs" component={ContactUs} />
    </Stack.Navigator>
  );
};

export default SettingsStack;
