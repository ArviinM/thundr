import { api } from '@services/api';

export interface AuthenticationPostBody {
   phoneNumber: string;
   password: string;
   email?: string;
}

export interface RegisterMobilePostBody {
   phoneNumber: string;
}

export interface RegisterMobileResponse {
   data: {
      phoneNumber: string;
      email: string;
      session: string;
   };
}

export interface EmailPostBody {
   email: string;
}

export enum ChallengeName {
   sms_mfa = 'SMS_MFA',
   email_required = 'EMAIL_REQUIRED',
   email_mfa = 'EMAIL_MFA',
   new_password_required = 'NEW_PASSWORD_REQUIRED',
}

export interface ValidateQuestion {
   email?: string;
   phoneNumber?: string;
   session?: string;
   challengeName: ChallengeName;
   challengeAnswer: string;
   password?: string;
}

export interface APIChallengeQuestionResponseData {
   username?: string;
   accessToken?: string;
   idToken?: string;
   refreshToken?: string;
   session?: string;
   challengeName?: ChallengeName;
   sub?: string;
   forProfileCreation?: boolean;
}
export interface APIChallengeQuestionResponse {
   data: APIChallengeQuestionResponseData;
   message: string;
   error: boolean;
}

// export interface APIEmailVerificationResponseData

interface APIEmailVerificationResponseData
   extends APIChallengeQuestionResponseData {}

export interface APIEmailVerificationResponse {
   data: APIEmailVerificationResponseData;
}

export interface ErrorResponse {
   status: number;
   data: {
      message: string;
   };
}

export interface ApiSMSSSOPostBody {
   sub: string;
   phoneNumber: string;
}

export interface ApiSMSSSOConfirmPostBody extends ApiSMSSSOPostBody {
   session: string;
   challengeAnswer: string;
}

export const userApi = api.injectEndpoints({
   endpoints: build => ({
      authenticate: build.mutation<
         AuthenticationPostBody,
         Partial<AuthenticationPostBody>
      >({
         query: body => ({
            url: 'auth/login',
            method: 'POST',
            body,
         }),
         transformErrorResponse: (response: ErrorResponse) => {
            return response.data.message;
         },
      }),
      registerMobile: build.mutation<
         RegisterMobileResponse,
         Partial<RegisterMobilePostBody>
      >({
         query: body => ({
            url: 'auth/cognito-create-user',
            method: 'POST',
            body,
         }),
      }),
      registerEmail: build.mutation<
         APIEmailVerificationResponseData,
         Partial<EmailPostBody>
      >({
         query: body => ({
            url: 'auth/email-code',
            method: 'POST',
            body,
         }),
         transformResponse: (response: APIEmailVerificationResponse) =>
            response.data,
      }),
      validateQuestion: build.mutation<
         APIChallengeQuestionResponseData,
         Partial<ValidateQuestion>
      >({
         query: body => {
            return {
               url: 'auth/validate-challenge-question',
               method: 'POST',
               body,
            };
         },
         transformResponse: (response: APIChallengeQuestionResponse) =>
            response.data,
         transformErrorResponse: (response: ErrorResponse) => {
            return response.data.message;
         },
      }),
      validateMobileSSO: build.mutation<void, Partial<ApiSMSSSOPostBody>>({
         query: body => ({
            url: 'auth/sso-sms-otp',
            method: 'POST',
            body,
         }),
      }),
      confirmMobileSSO: build.mutation<void, Partial<ApiSMSSSOConfirmPostBody>>(
         {
            query: body => ({
               url: 'auth/sso-validate-sms-otp',
               method: 'POST',
               body,
            }),
         },
      ),
   }),
});

export const {
   useAuthenticateMutation,
   useRegisterMobileMutation,
   useValidateQuestionMutation,
   useValidateMobileSSOMutation,
   useRegisterEmailMutation,
   useConfirmMobileSSOMutation,
} = userApi;
