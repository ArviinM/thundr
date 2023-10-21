import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import BackButtonArrow from '@atoms/BackButtonArrow';

import type {
   RootStackParamList,
   RegistrationStackParamList,
   RegisterMobileNumberFlow,
   StartUpFlow,
   MobileRegistrationFlow,
   ForProfileCreationFlow,
} from 'types/navigation';

/**
 * Screens
 */
import KeyFeatures from '@screens/KeyFeatures';
import StartUp from '@screens/Startup';

import {
   MobileNumber,
   CreatePassword,
   Email,
   OTP,
} from '@screens/Registration';

import Login from '@screens/Login';

import Dashboard from '@screens/Dashboard';

import PrimaryDetails from '@screens/ProfileCreation/PrimaryDetails';
import CompatibilityQuestions from '@screens/ProfileCreation/CompatibilityQuestions';
import { Image } from 'react-native';
import { useAuth, useTheme } from '@hooks';

const MainStack = createStackNavigator<RootStackParamList>();
const RegistrationStack = createStackNavigator<RegistrationStackParamList>();

// const ContinueWithMobileNumberStack =
//    createStackNavigator<RegisterMobileNumberFlow>();

// const RegistrationRoutes = () => {
//    const { Images } = useTheme();

//    return (
//       <RegistrationStack.Navigator initialRouteName="StartUp">
//          <RegistrationStack.Group
//             screenOptions={({ navigation }) => ({
//                headerTitleAlign: 'center',
//                headerTitle: () => (
//                   <Image
//                      source={Images.app_bar.logo}
//                      style={{ width: 130 }}
//                      resizeMode="center"
//                   />
//                ),
//                headerLeft: () => (
//                   <BackButtonArrow onPress={() => navigation.goBack()} />
//                ),
//             })}
//          >
//             <RegistrationStack.Screen
//                name="PrimaryDetails"
//                component={PrimaryDetails}
//             />
//             <RegistrationStack.Screen
//                name="CompatibilityQuestions"
//                component={CompatibilityQuestions}
//             />
//          </RegistrationStack.Group>
//          <RegistrationStack.Screen
//             name="StartUp"
//             component={StartUp}
//             options={{
//                headerShown: false,
//             }}
//          />
//          <RegistrationStack.Group
//             screenOptions={({ navigation }) => ({
//                headerShown: true,
//                headerBackTitleVisible: false,
//                headerTitle: '',
//                headerStyle: {
//                   backgroundColor: '#F2CECD',
//                },
//                headerLeft: () => (
//                   <BackButtonArrow onPress={() => navigation.goBack()} />
//                ),
//             })}
//          >
//             <RegistrationStack.Screen
//                name="MobileRegistration"
//                component={MobileNumber}
//             />
//             <RegistrationStack.Screen name="OTP" component={OTP} />
//             <RegistrationStack.Screen name="Email" component={Email} />
//             <RegistrationStack.Screen
//                name="CreatePassword"
//                component={CreatePassword}
//             />
//             <RegistrationStack.Screen name="Login" component={Login} />
//          </RegistrationStack.Group>
//          <RegistrationStack.Screen name="Dashboard" component={Dashboard} />
//       </RegistrationStack.Navigator>
//    );
// };

const StartUpStack = createStackNavigator<StartUpFlow>();
const MobileRegistrationStack = createStackNavigator<MobileRegistrationFlow>();
const ForProfileCreationStack = createStackNavigator<ForProfileCreationFlow>();

const MobileRegistrationFlow = () => {
   return (
      <MobileRegistrationStack.Navigator
         initialRouteName="RegisterMobileNumber"
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
         <MobileRegistrationStack.Screen
            name="RegisterMobileNumber"
            component={MobileNumber}
         />
         <MobileRegistrationStack.Group
            screenOptions={{
               headerShown: false,
               gestureEnabled: false,
            }}
         >
            <MobileRegistrationStack.Screen name="NumberOTP" component={OTP} />
            <MobileRegistrationStack.Screen
               name="RegisterEmail"
               component={Email}
            />
            <MobileRegistrationStack.Screen name="EmailOTP" component={OTP} />
            <RegistrationStack.Screen
               name="CreatePassword"
               component={CreatePassword}
            />
         </MobileRegistrationStack.Group>
      </MobileRegistrationStack.Navigator>
   );
};

const StartUpFlow = () => {
   return (
      <StartUpStack.Navigator
         screenOptions={{
            headerShown: false,
         }}
      >
         <StartUpStack.Screen name="StartUp" component={StartUp} />
         <StartUpStack.Group
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
            <StartUpStack.Screen
               name="MobileRegistrationFlow"
               component={MobileRegistrationFlow}
               options={{
                  header: () => null,
               }}
            />
            <StartUpStack.Screen name="Login" component={Login} />
         </StartUpStack.Group>
      </StartUpStack.Navigator>
   );
};
// @refresh reset
const MainNavigator = () => {
   const { authenticationState } = useAuth();
   const { Images } = useTheme();

   if (authenticationState.isLogin && authenticationState.forProfileCreation) {
      return (
         <ForProfileCreationStack.Navigator
            screenOptions={({ navigation }) => ({
               headerTitleAlign: 'center',
               headerTitle: () => (
                  <Image
                     source={Images.app_bar.logo}
                     style={{ width: 130 }}
                     resizeMode="center"
                  />
               ),
            })}
         >
            <ForProfileCreationStack.Screen
               name="PrimaryDetails"
               component={PrimaryDetails}
            />
            <ForProfileCreationStack.Screen
               name="CompatibilityQuestions"
               component={CompatibilityQuestions}
            />
         </ForProfileCreationStack.Navigator>
      );
   }

   return (
      <MainStack.Navigator
         screenOptions={{ headerShown: false }}
         initialRouteName="StartUpFlow"
      >
         <MainStack.Screen name="KeyFeatures" component={KeyFeatures} />
         <MainStack.Screen name="StartUpFlow" component={StartUpFlow} />
      </MainStack.Navigator>
   );
};

export default MainNavigator;
