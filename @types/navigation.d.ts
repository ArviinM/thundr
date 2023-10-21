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

// NavigatorScreenParams<RegistrationStackParamList>;

export type RegisterMobileNumberFlow = {
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
   PrimaryDetails: undefined;
   CompatibilityQuestions: undefined;
   Dashboard: undefined;
};

export type SingleSignOnFlow = {
   StartUp: {
      payload: string;
   };
};

type OTPParams = { phoneNumber?: string; email?: string; session?: string };

export type MobileRegistrationFlow = {
   RegisterMobileNumber: undefined;
   NumberOTP: OTPParams;
   RegisterEmail: {
      session?: string;
      phoneNumber?: string;
   };
   EmailOTP: OTPParams;
   CreatePassword: {
      session?: string;
      phoneNumber?: string;
   };
};

export type StartUpFlow = {
   StartUp: {
      payload?: string;
   };
   MobileRegistrationFlow: NavigatorScreenParams<MobileRegistrationFlow>;
   Login: undefined;
};

export type RootStackParamList = {
   KeyFeatures: undefined;
   StartUpFlow: NavigatorScreenParams<StartUpFlow>;
};

export type ForProfileCreationFlow = {
   PrimaryDetails: undefined;
   CompatibilityQuestions: undefined;
};
