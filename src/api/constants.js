export const LOGIN = {
  LOGIN: 'auth/login',
  LOGOUT: 'auth/logout',
};

export const MOBILE_EMAIL = {
  MOBILE_VALIDATION: 'auth/cognito-create-user',
  MOBILE_VERIFICATION: 'auth/validate-challenge-question',
  EMAIL_VALIDATION: 'auth/email-code',
  EMAIL_VERIFICATION: 'auth/validate-challenge-question',
};

export const SSO_VALIDATION = {
  SSO_MOBILE_VALIDATION: 'auth/sso-sms-otp',
  SSO_MOBILE_VERIFICATION: 'auth/sso-validate-sms-otp',
};
