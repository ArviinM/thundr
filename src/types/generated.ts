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
