import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNavigationContainerRef} from '@react-navigation/native';
import {
  CompatibilityQuestionsRequest,
  EmailValidationResponse,
  EmailVerificationResponse,
  MobileValidationResponse,
  MobileVerificationResponse,
} from '../types/generated.ts';
export const Stack = createNativeStackNavigator();
export const Tab = createBottomTabNavigator();
export const navigationRef = createNavigationContainerRef();

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
  // Profile Creation
  CustomerName: undefined;
  CustomerBirthday: undefined;
  CustomerGender: undefined;
  CustomerRequestAccess: undefined;
  CompatibilityQuestions: CompatibilityQuestionsRequest;
  CustomerInterests: undefined;
  CustomerAdditionalInfos: undefined;
  CustomerPhotoBio: undefined;
  Onboarding: undefined;
};
