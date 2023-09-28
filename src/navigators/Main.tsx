import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import BackButtonArrow from '@atoms/BackButtonArrow';

import type {
   RootStackParamList,
   RegistrationStackParamList,
} from 'types/navigation';

/**
 * Screens
 */
import KeyFeatures from '@screens/KeyFeatures';
import StartUp from '@screens/Startup';

import MobileNumber from '@screens/Registration/MobileNumber';
import OTP from '@screens/Registration/OTP';
import CreatePassword from '@screens/Registration/CreatePassword';

import Login from '@screens/Login';

import PrimaryDetails from '@screens/ProfileCreation/PrimaryDetails';
import CompatibilityQuestions from '@screens/ProfileCreation/CompatibilityQuestions';
import { Image } from 'react-native';
import { useTheme } from '@hooks';

const MainStack = createStackNavigator<RootStackParamList>();
const RegistrationStack = createStackNavigator<RegistrationStackParamList>();

const RegistrationRoutes = () => {
   const { Images } = useTheme();

   return (
      <RegistrationStack.Navigator initialRouteName="StartUp">
         <RegistrationStack.Group
            screenOptions={({ navigation }) => ({
               headerTitleAlign: 'center',
               headerTitle: () => (
                  <Image
                     source={Images.app_bar.logo}
                     style={{ width: 130 }}
                     resizeMode="center"
                  />
               ),
               headerLeft: () => (
                  <BackButtonArrow onPress={() => navigation.goBack()} />
               ),
            })}
         >
            <RegistrationStack.Screen
               name="PrimaryDetails"
               component={PrimaryDetails}
            />
            <RegistrationStack.Screen
               name="CompatibilityQuestions"
               component={CompatibilityQuestions}
            />
         </RegistrationStack.Group>
         <RegistrationStack.Screen
            name="StartUp"
            component={StartUp}
            options={{
               headerShown: false,
            }}
         />
         <RegistrationStack.Group
            screenOptions={({ navigation }) => ({
               headerShown: true,
               headerBackTitleVisible: false,
               headerTitle: '',
               headerStyle: {
                  backgroundColor: '#F2CECD',
               },
               headerLeft: () => (
                  <BackButtonArrow onPress={() => navigation.goBack()} />
               ),
            })}
         >
            <RegistrationStack.Screen
               name="MobileRegistration"
               component={MobileNumber}
            />
            <RegistrationStack.Screen name="OTP" component={OTP} />
            <RegistrationStack.Screen
               name="CreatePassword"
               component={CreatePassword}
            />
            <RegistrationStack.Screen name="Login" component={Login} />
         </RegistrationStack.Group>
      </RegistrationStack.Navigator>
   );
};

// @refresh reset
const MainNavigator = () => {
   return (
      <MainStack.Navigator
         screenOptions={{ headerShown: false }}
         initialRouteName="StartUpStack"
      >
         <MainStack.Screen name="KeyFeatures" component={KeyFeatures} />
         <MainStack.Screen name="StartUpStack" component={RegistrationRoutes} />
      </MainStack.Navigator>
   );
};

export default MainNavigator;
