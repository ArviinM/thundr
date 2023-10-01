import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

export type RegistrationStackParamList = {
   StartUp: {
      payload: string;
   };
   MobileRegistration: undefined;
   OTP: undefined;
   CreatePassword: undefined;
   Login: undefined;
   PrimaryDetails: undefined;
   CompatibilityQuestions: undefined;
   Dashboard: undefined;
};

export type RootStackParamList = {
   KeyFeatures: undefined;
   StartUpStack: NavigatorScreenParams<RegistrationStackParamList>;
};
