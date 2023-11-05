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
import OnboardingScreen from '../../screens/public/OnboardingScreen/OnboardingScreen';
import LoginScreen from '../../screens/public/LoginScreen/LoginScreen';
import Image from '../../components/Image/Image';

// Utils
import {scale} from '../../utils/commons';
import LoginOptionScreen from '../../screens/public/LoginOptionsScreen/LoginOptionScreen';
import {GLOBAL_ASSET_URI} from '../../utils/images';
import MobileAndEmailVerificationStack from './MobileAndEmailVerificationStack';

const PublicScreenStack = createStackNavigator();

const PublicScreenNavigation = () => {
  const navigation = useNavigation();
  const renderBackIcon = () => {
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
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
    <PublicScreenStack.Navigator
      initialRouteName="OnboardingScreen"
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
      <PublicScreenStack.Screen
        name="OnboardingScreen"
        component={OnboardingScreen}
      />
      <PublicScreenStack.Screen
        name="LoginOptionScreen"
        component={LoginOptionScreen}
      />
      <PublicScreenStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#f2cecd',
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTitle: '',
        }}
      />
      <PublicScreenStack.Screen
        name="MobileAndEmailVerificationStack"
        component={MobileAndEmailVerificationStack}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#f2cecd',
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTitle: '',
        }}
      />
    </PublicScreenStack.Navigator>
  );
};

export default PublicScreenNavigation;
