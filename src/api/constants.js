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
  SMS_RESEND_OTP: 'auth/cognito-resend-sms-otp',
  EMAIL_RESEND_OTP: 'auth/cognito-resend-email-otp',
};

// SSO Registration services
export const SSO_VALIDATION = {
  SSO_MOBILE_VALIDATION: 'auth/sso-sms-otp',
  SSO_MOBILE_VERIFICATION: 'auth/sso-validate-sms-otp',
  SSO_MOBILE_RESEND_OTP: 'auth/sso-resend-sms-otp',
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
  GET_UNREAD_MESSAGES: 'chat/chat-room',
  READ_CHAT_MESSAGE: 'chat/message-read',
  GET_POSSIBLES: 'match/customer-possible',
  REPORT_CATEGORY: 'report/customer',
  UPLOAD_PHOTO_MESSAGE: 'chat/photo-message-upload-url',
  DOWNLOAD_PHOTO_MESSAGE: 'chat/photo-message-download-url',
};

// Filter sercices
export const FILTERS = {
  GET_AND_UPDATE_FILTER: 'customer/customer-filter',
};

// Subscription services
export const SUBSCRIPTION = {
  GET_SUBSCRIPTION_DETAILS: 'subscription/details',
};

// Settings
export const SETTINGS = {
  GET_AND_SAVE_CUSTOMER_SETTINGS: 'customer/customer-setting',
  GET_AND_SAVE_CUSTOMER_SURVEY: 'customer/customer-survey',
};

// Current user profile
export const USER_PROFILE = {
  UPDATE_USER_PROFILE: 'customer/update-details',
};

// Notification Device Token
export const USER_DEVICE_TOKEN = {
  REGISTER_USER_DEVICE_TOKEN: 'notification/register-token',
};
