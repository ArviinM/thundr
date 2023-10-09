import {
   BaseQueryFn,
   FetchArgs,
   createApi,
   fetchBaseQuery,
   FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

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

const baseQueryWithInterceptor: BaseQueryFn<
   string | FetchArgs,
   unknown,
   FetchBaseQueryError
> = async (args, api, extraOptions) => {
   let result = await baseQuery(args, api, extraOptions);
   if (result.error && result.error.status === 401) {
   }

   return result;
};

export const api = createApi({
   baseQuery: baseQueryWithInterceptor,
   endpoints: () => ({}),
});
