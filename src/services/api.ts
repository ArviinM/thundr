import {
   BaseQueryFn,
   FetchArgs,
   createApi,
   fetchBaseQuery,
   FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

import { show, hide } from '@store/spinner/spinner.slice';

import { type RootState } from '../store';

const baseQuery = fetchBaseQuery({
   baseUrl: process.env.API_URL,
   prepareHeaders(headers, { getState }) {
      const {
         authentication: { accessToken },
      } = getState() as RootState;

      if (accessToken) {
         console.log(`Bearer ${accessToken}`);
         headers.set('authorization', `Bearer ${accessToken}`);
         return headers;
      }
   },
});

type BaseQueryType = BaseQueryFn<
   string | FetchArgs,
   unknown,
   FetchBaseQueryError
>;

const dispatchSpinner = (
   api: Parameters<typeof baseQueryWithInterceptor>[1],
   state: boolean = false,
) => {
   if (
      ![
         'authenticate',
         'registerMobile',
         'registerEmail',
         'validateQuestion',
         'validateMobileSSO',
         'confirmMobileSSO',
      ].includes(api.endpoint)
   ) {
      return;
   }

   api.dispatch(state ? show() : hide());
};

const baseQueryWithInterceptor: BaseQueryType = async (
   args,
   api,
   extraOptions,
) => {
   dispatchSpinner(api, true);

   let rawResponse = await baseQuery(args, api, extraOptions);
   if (rawResponse.error && rawResponse.error.status === 401) {
   }

   dispatchSpinner(api);

   return rawResponse;
};

export const api = createApi({
   baseQuery: baseQueryWithInterceptor,
   tagTypes: ['ChallengeQuestion'],
   endpoints: () => ({}),
});
