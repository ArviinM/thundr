import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

import { ChallengeName } from '@services/modules/users';

export type RegistrationStackParamList = {
   StartUp: {
      payload: string;
   };
   MobileRegistration: undefined;
   OTP: {
      phoneNumber?: string;
      email?: string;
      session?: string;
   };
   Email: {
      session?: string;
      phoneNumber?: string;
   };
   CreatePassword: {
      session?: string;
      phoneNumber?: string;
   };
   Login: undefined;
   PrimaryDetails: undefined;
   CompatibilityQuestions: undefined;
   Dashboard: undefined;
};

export type RootStackParamList = {
   KeyFeatures: undefined;
   StartUpStack: NavigatorScreenParams<RegistrationStackParamList>;
};
