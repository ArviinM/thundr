export type BaseResponse<T> = {
  data: T;
  message: string;
  error: boolean;
  status: string;
};

export type AuthDataRequest = {
  phoneNumber: string;
  password: string;
};

export type AuthDataResponse = {
  username: string;
  accessToken: string;
  idToken: string;
  refreshToken: string;
  sub: string;
  loginDeactivated: boolean;
  session?: string;
};

export type AuthStoreState = {
  authData?: AuthDataResponse;
  setAuthData: (data: AuthDataResponse) => void;
};

// Mobile Validation Types
export type MobileValidationRequest = {
  phoneNumber: string;
};

export type MobileValidationResponse = {
  username: string;
  session: string;
  challengeName: string;
  forProfileCreation: boolean;
  loginDeactivated: boolean;
};

// Mobile Verification Types
export type MobileVerificationRequest = {
  phoneNumber: string;
  session: string;
  challengeName: string;
  challengeAnswer: string;
};

export type MobileVerificationResponse = {
  username: string;
  session: string;
  challengeName: string;
  forProfileCreation: boolean;
  loginDeactivated: boolean;
};

// Email Validation Types
export type EmailValidationRequest = {
  phoneNumber: string;
  email: string;
  session: string;
  challengeName: string;
};

export type EmailValidationResponse = {
  username: string;
  session: string;
  challengeName: string;
  forProfileCreation: boolean;
  loginDeactivated: boolean;
  // add here email later email: string
};

// Email Verification Types
export type EmailVerificationRequest = {
  phoneNumber: string;
  email: string;
  session: string;
  challengeName: string;
  challengeAnswer: string;
};

export type EmailVerificationResponse = {
  username: string;
  session: string;
  challengeName: string;
  forProfileCreation: boolean;
  loginDeactivated: boolean;
};
