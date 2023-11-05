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

// Components
import Dashboard from '../../screens/private/Dashboard/Dashboard';
import Image from '../../components/Image/Image';

// Utils
import {scale} from '../../utils/commons';
import {GLOBAL_ASSET_URI} from '../../utils/images';
import {useDispatch, useSelector} from 'react-redux';
import ProfileCreationScreen from '../../screens/public/ProfileCreationScreen/ProfileCreationScreen';
import {START_LOGOUT} from '../../ducks/Login/actionTypes';

const Stack = createStackNavigator();

const PrivateScreenNavigation = () => {
  const dispatch = useDispatch();
  const {loginData} = useSelector(state => state.login);
  const navigation = useNavigation();
  const renderBackIcon = () => {
    return (
      // <TouchableOpacity onPress={() => navigation.goBack()}>
      <TouchableOpacity onPress={() => dispatch({type: START_LOGOUT})}>
        <Image
          source={GLOBAL_ASSET_URI.BACK_ICON}
          height={25}
          width={25}
          customStyle={{left: scale(20), justifyContent: 'center'}}
        />
      </TouchableOpacity>
    );
  };

  console.log('loginData.forProfileCreation', loginData);

  const getInitialRoute = () => {
    if (loginData.forProfileCreation) {
      return 'ProfileCreationScreen';
    } else {
      return 'Dashboard';
    }
  };

  return (
    <Stack.Navigator
      initialRouteName={getInitialRoute()}
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
        headerStyle: {
          backgroundColor: '#0D5176',
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
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen
        name="ProfileCreationScreen"
        component={ProfileCreationScreen}
        options={{headerShown: true, title: 'Create Profile'}}
      />
    </Stack.Navigator>
  );
};

export default PrivateScreenNavigation;
