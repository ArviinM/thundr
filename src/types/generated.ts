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
