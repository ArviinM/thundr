import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

export type RegistrationStackParamList = {
   StartUp: undefined;
   MobileRegistration: undefined;
   OTP: undefined;
   CreatePassword: undefined;
   Login: undefined;
   PrimaryDetails: undefined;
};

export type RootStackParamList = {
   KeyFeatures: undefined;
   StartUpStack: NavigatorScreenParams<RegistrationStackParamList>;
};
