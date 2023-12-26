// Login service
export const LOGIN = {
  LOGIN: 'auth/login',
  LOGOUT: 'auth/logout',
  LOGIN_VIA_REFRESH_TOKEN: 'auth/refresh',
};

// Mobile and Email registration services
export const MOBILE_EMAIL = {
  MOBILE_VALIDATION: 'auth/cognito-create-user',
  MOBILE_VERIFICATION: 'auth/validate-challenge-question',
  EMAIL_VALIDATION: 'auth/email-code',
  EMAIL_VERIFICATION: 'auth/validate-challenge-question',
};

// SSO Registration services
export const SSO_VALIDATION = {
  SSO_MOBILE_VALIDATION: 'auth/sso-sms-otp',
  SSO_MOBILE_VERIFICATION: 'auth/sso-validate-sms-otp',
};

// Profile creation services
export const PROFILE_CREATION = {
  CREATE_PROFILE: 'customer/create-profile',
  UPLOAD_PHOTO: 'customer/customer-photo',
  COMPATIBILITY_QUESTIONS: 'customer/question',
  COMPATIBILITY_ANSWERS: 'customer/customer-answer',
  CUSTOMER_DETAILS: 'customer/customer-details',
  UPLOAD_PHOTO_BASE_64: 'customer/customer-photo-b64',
};

// Dashboard services
export const DASHBOARD = {
  GET_CUSTOMER_DETAILS: 'customer/customer-details',
  GET_CUSTOMER_PHOTO: 'customer/customer-photo',
  GET_CUSTOMER_PROFILE: 'customer/profile',
  GET_MATCH_LIST: 'match/match',
  CUSTOMER_MATCH: 'match/customer-match',
  CURRENT_LOCATION: 'match/match-location',
  GET_OR_SEND_MESSAGE: 'chat/message',
  LAST_ACTIVITY: 'chat/last-activity',
};
