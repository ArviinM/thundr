import { api } from '../../api';

export interface AuthenticationPostBody {
   phoneNumber: string;
   password: string;
   email?: string;
}

export interface RegisterMobilePostBody {
   phoneNumber: string;
   email: string;
}

export interface ValidateQuestion {
   phoneNumber: string;
   session: string;
   challengeName: string;
   challengeAnswer: string;
   password: string;
}

interface ErrorResponse {
   status: number;
   data: {
      message: string;
   };
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
         RegisterMobilePostBody,
         Partial<RegisterMobilePostBody>
      >({
         query: body => ({
            url: 'auth/cognito-create-user',
            method: 'POST',
            body,
         }),
      }),
      validateQuestion: build.mutation<
         ValidateQuestion,
         Partial<ValidateQuestion>
      >({
         query: body => {
            console.log('body', body);
            return {
               url: 'auth/validate-challenge-question',
               method: 'POST',
               body,
            };
         },
      }),
   }),
});

export const {
   useAuthenticateMutation,
   useRegisterMobileMutation,
   useValidateQuestionMutation,
} = userApi;
