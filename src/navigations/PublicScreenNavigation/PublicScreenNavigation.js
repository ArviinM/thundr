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
import ProfileCreationScreen from '../../screens/public/ProfileCreationScreen/ProfileCreationScreen';
import Dashboard from '../../screens/private/Dashboard/Dashboard';
import Image from '../../components/Image/Image';

// Utils
import {scale} from '../../utils/commons';
import LoginOptionScreen from '../../screens/public/LoginOptionsScreen/LoginOptionScreen';
import MobileValidationScreen from '../../screens/public/MobileValidationScreen/MobileValidationScreen';
import MobileVerificationScreen from '../../screens/public/MobileVerificationScreen/MobileVerificationScreen';
import {GLOBAL_ASSET_URI} from '../../utils/images';
import EmailValidationScreen from '../../screens/public/EmailValidationScreen/EmailValidationScreen';
import CreatePasswordScreen from '../../screens/public/CreatePasswordScreen/CreatePasswordScreen';
import EmailVerificationScreen from '../../screens/public/EmailVerificationScreen/EmailVerificationScreen';

const Stack = createStackNavigator();

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
    <Stack.Navigator
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
      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
      <Stack.Screen name="LoginOptionScreen" component={LoginOptionScreen} />
      <Stack.Screen
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
      <Stack.Screen
        name="MobileValidationScreen"
        component={MobileValidationScreen}
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
      <Stack.Screen
        name="MobileVerificationScreen"
        component={MobileVerificationScreen}
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
      <Stack.Screen
        name="EmailValidationScreen"
        component={EmailValidationScreen}
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
      <Stack.Screen
        name="CreatePasswordScreen"
        component={CreatePasswordScreen}
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
      <Stack.Screen
        name="EmailVerificationScreen"
        component={EmailVerificationScreen}
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
      <Stack.Screen
        name="ProfileCreationScreen"
        component={ProfileCreationScreen}
        options={{headerShown: true, title: 'Create Profile'}}
      />
    </Stack.Navigator>
  );
};

export default PublicScreenNavigation;
