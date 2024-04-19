import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNavigationContainerRef} from '@react-navigation/native';
import {
  CompatibilityQuestionsRequest,
  CustomerData,
  CustomerMatchResponse,
  EmailValidationResponse,
  EmailVerificationResponse,
  MobileValidationResponse,
  MobileVerificationResponse,
} from '../types/generated.ts';
import {createDrawerNavigator} from '@react-navigation/drawer';
export const Stack = createNativeStackNavigator();
export const Tab = createBottomTabNavigator();
export const Drawer = createDrawerNavigator();

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
  Home: undefined;
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
  Login: undefined;
  LoginValidation: undefined;
  Terms: {uri: string};
  ForgetPasswordValidation: undefined;
  ForgetPasswordVerification: {email: string};
  PasswordReset: undefined;
  PasswordNewValidation: undefined;
  PasswordResetConfirmed: undefined;
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
  MatchFound: {sub?: string; isMare: boolean; matchPhoto: string};

  // Profile
  ProfileStack: undefined;
  Profile: undefined;
  EditProfile: CustomerData;

  // Drawer
  ThundrBolt: undefined;
  ThundrMachi: undefined;
  Settings: undefined;
  HomeDrawer: undefined;
};
