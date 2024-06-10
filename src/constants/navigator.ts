import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNavigationContainerRef} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {
  Chat,
  CompatibilityQuestionsRequest,
  CustomerData,
  EmailValidationResponse,
  EmailVerificationResponse,
  MobileValidationResponse,
  MobileVerificationResponse,
} from '../types/generated.ts';

export const Stack = createNativeStackNavigator();
export const Tab = createBottomTabNavigator();
export const Drawer = createDrawerNavigator();
export const Top = createMaterialTopTabNavigator();

export const navigationRef =
  createNavigationContainerRef<RootNavigationParams>();

export function navigate<RouteName extends keyof RootNavigationParams>(
  name: RouteName,
  params?: RootNavigationParams[RouteName],
) {
  if (navigationRef.isReady()) {
    // @ts-ignore
    navigationRef.navigate(name, params);
  }
}

export type RootNavigationParams = {
  HomeTab: undefined;
  Home: {payload?: string};
  // Registration
  // Mobile Process
  MobileValidation: undefined;
  MobileVerification: MobileValidationResponse;
  // Email Process
  EmailValidation: MobileVerificationResponse;
  EmailVerification: EmailValidationResponse;
  // Password Creation
  PasswordCreation: EmailVerificationResponse;
  // Login
  Login: {payload?: any};
  LoginValidation: undefined;
  Terms: {uri: string; isAuthenticated?: boolean};
  ForgetPasswordValidation: undefined;
  ForgetPasswordVerification: {phoneNumber: string};
  PasswordReset: {phoneNumber: string; code: string};
  PasswordNewValidation: {
    phoneNumber?: string;
    code?: string;
    isAuthenticated?: boolean;
  };
  PasswordResetConfirmed: {isAuthenticated?: boolean};
  // Profile Creation
  CustomerName: undefined;
  CustomerBirthday: undefined;
  CustomerGender: undefined;
  CustomerRequestAccess: undefined;
  CompatibilityQuestions: CompatibilityQuestionsRequest;
  CustomerInterests: undefined;
  CustomerAdditionalInfos: undefined;
  CustomerPersonalityType: undefined;
  CustomerPhotoBio: undefined;
  Onboarding: undefined;

  //Match Found
  MatchFound: {
    sub?: string;
    isMare: boolean;
    matchPhoto: string;
    chatRoomId: string;
  };

  // Profile
  ProfileStack: undefined;
  Profile: undefined;
  EditProfile: CustomerData;

  // Drawer
  ThundrBolt: undefined;

  ThundrMachi: undefined;
  Settings: undefined;
  HomeDrawer: undefined;

  // The Possibles
  Possibles: undefined;

  // chats
  ChatMessages: {user: Chat; isMare: boolean};
  Messages: {chatRoomId?: string; isMare?: boolean};

  SettingsStack: undefined;
  ThundrBoltModal: {isModal: boolean};
  CustomerDeactivate: undefined;

  //notif
  Notification: undefined;

  //maintenance
  Maintenance: undefined;
  VersionUpdate: undefined;

  //advocacy
  Advocacy: undefined;
  AdvocacyDonate: undefined;
};
