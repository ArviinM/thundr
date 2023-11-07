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

export const PROFILE_CREATION = {
  CREATE_PROFILE: 'customer/create-profile',
  UPLOAD_PHOTO: 'customer/customer-photo',
  COMPATIBILITY_QUESTIONS: 'customer/question',
  COMPATIBILITY_ANSWERS: 'customer/customer-answer',
  CUSTOMER_DETAILS: 'customer/customer-details',
};
