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
  forProfileCreation: boolean;
  session?: string;
};

export type AuthStoreState = {
  authData?: AuthDataResponse;
  setAuthData: (data: AuthDataResponse) => void;
};

export type AuthRefreshTokenRequest = {
  refreshToken: string;
};

export type AuthRefreshTokenResponse = {
  accessToken: string;
  idToken: string;
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

export type MobileResendOTPRequest = {
  phoneNumber: string;
  session: string;
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
  email: string;
};

// Email Verification Types
export type EmailVerificationRequest = {
  phoneNumber: string;
  email: string;
  session: string;
  challengeName: string;
  challengeAnswer: string;
};

export type EmailCodeResendRequest = {
  phoneNumber: string;
  session: string;
  email: string;
};

export type EmailVerificationResponse = {
  username: string;
  session: string;
  challengeName: string;
  forProfileCreation: boolean;
  loginDeactivated: boolean;
  email: string;
};

// Password Creation Types
export type PasswordCreationRequest = {
  phoneNumber: string;
  email: string;
  session: string;
  challengeName: string;
  password: string;
};

export type PasswordCreationResponse = {
  accessToken: string;
  idToken: string;
  username: string;
  refreshToken: string;
  sub: string;
  forProfileCreation: boolean;
  loginDeactivated: boolean;
};

// Customer Profile Types
export type CustomerCreateProfileRequest = {
  sub: string;
  name: string;
  gender: string;
  birthday: string;
  hometown: string;
};

export type CustomerCreateProfileResponse = {
  sub: string;
  name: string;
  gender: string;
  birthday: string;
  hometown: string;
  created: string;
  deactivateDate: string | null;
  activated: boolean;
};

// Customer
export type CustomerMatchLocationRequest = {
  sub: string;
  longitude: string;
  latitude: string;
};

export type CustomerMatchLocationResponse = {
  sub: string;
  longitude: string;
  latitude: string;
  lastUpdate: string;
};

// Compatibility Questions
export type CompatibilityQuestionsRequest = {
  sub: string;
};

export type CompatibilityChoice = {
  id: number;
  answer: string;
  sequence: string;
  updateDate: string | null;
};

export type CompatibilityQuestion = {
  id: number;
  category: string;
  question: string;
  updateDate: string;
  compatibilityAnswer: CompatibilityChoice[];
  selected?: number;
};

//Compatibility POST Questions
export type CompatibilityAnswer = {
  questionId: string;
  answerId: number;
};

export type CompatibilityAnswersRequest = {
  sub: string;
  compatibilities: CompatibilityAnswer[];
};

export type CompatibilityAnswersResponse = {
  id: number;
  sub: null;
  questionId: number;
  answerId: number;
  createDate: string;
};

// Customer Details
export type CustomerDetailsRequest = {
  sub: string;
  bio: string;
  work: string;
  location: string;
  hobbies: string;
  height: string;
  starSign: string;
  education: string;
  drinking: string;
  smoking: string;
  religion: string;
  pet: string;
  politics: string;
  personalityType: string;
};

export type CustomerDetailsResponse = {
  id: number;
  sub: string;
  bio: string;
  work: string;
  location: string;
  hobbies: string;
  height: string;
  starSign: string;
  education: string;
  drinking: string;
  smoking: string;
  religion: string;
  pet: string;
  politics: string;
  personalityType: string;
};

// Match Details
export type CustomerMatchRequest = {
  sub: string;
};

export type CustomerMatchResponse = {
  sub: string;
  percent: string;
  customerData: CustomerData;
};

export type CustomerDetails = {
  bio: string;
  work: string;
  location: string;
  height: string;
  starSign: string;
  education: string;
  drinking: string;
  smoking: string;
  religion: string;
  pet: string;
  politics: string;
  personalityType: string;
  hobbies: string;
};

// Define interface for customer photo
export type CustomerPhoto = {
  id: number;
  primary: boolean;
  photoUrl: string;
  index: number | null;
};

// Define interface for customer data
export type CustomerData = {
  sub: string;
  name: string;
  gender: string;
  birthday: string;
  hometown: string;
  deactivateDate: string | null;
  customerDetails: CustomerDetails;
  withCustomerDetails: boolean;
  withCustomerCompatibilities: boolean;
  customerPhoto: CustomerPhoto[];
  withCustomerPhoto: boolean;
  activated: boolean;
};
