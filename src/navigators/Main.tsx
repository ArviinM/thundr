import React from 'react';
import { KeyFeatures, Startup, Login } from '../screens';
import MobileNumber from '../screens/Registration/MobileNumber';
import OTP from '../screens/Registration/OTP';
import CreatePassword from '../screens/Registration/CreatePassword';
import {
   createStackNavigator,
   StackNavigationOptions,
} from '@react-navigation/stack';

import BackButtonArrow from '@atoms/BackButtonArrow';
import { useNavigation, NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
   KeyFeatures: undefined;
   Startup: undefined;
   Login: undefined;
   Registration: NavigatorScreenParams<RegistrationStackParamList>;
};

const bgColor: string = '#F2CECD';

const MainStack = createStackNavigator<RootStackParamList>();

export type RegistrationStackParamList = {
   MobileRegistration: undefined;
   OTP: undefined;
   CreatePassword: undefined;
};

const RegistrationStack = createStackNavigator<RegistrationStackParamList>();

// TODO: Remove any type

const getCustomHeaderConfig = (navigation: any): StackNavigationOptions => {
   return {
      headerShown: true,
      headerBackTitleVisible: false,
      headerTitle: '',
      headerStyle: {
         backgroundColor: bgColor,
      },
      headerLeft: () => <BackButtonArrow onPress={navigation.goBack} />,
   };
};

// TODO: Remove any type
const RegistrationRoutes = ({ navigation }: { navigation: any }) => (
   <RegistrationStack.Navigator
      screenOptions={getCustomHeaderConfig(navigation)}
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
   </RegistrationStack.Navigator>
);

// @refresh reset
const MainNavigator = () => {
   const navigation = useNavigation();

   return (
      <MainStack.Navigator
         screenOptions={{ headerShown: false }}
         initialRouteName="Registration"
      >
         <MainStack.Screen name="KeyFeatures" component={KeyFeatures} />
         <MainStack.Screen name="Startup" component={Startup} />
         <MainStack.Screen
            name="Login"
            component={Login}
            options={getCustomHeaderConfig(navigation)}
         />
         <MainStack.Screen name="Registration" component={RegistrationRoutes} />
      </MainStack.Navigator>
   );
};

export default MainNavigator;
