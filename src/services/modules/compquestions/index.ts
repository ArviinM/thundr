import { api } from '@services/api';

import { RawAPIResponse } from 'types/api.common';

export type Answer = {
   id: number;
   answer: string;
   sequence: string;
   updateDate?: string;
};

export type Question = {
   id: number;
   category: string;
   question: string;
   updateDate?: string;
   compatibilityAnswer: Answer[];
};

export type SubmitCustomerAnswerPostBody = {
   sub: string;
   questionId: string;
   answerId: string;
};

export const compQuestionsServices = api.injectEndpoints({
   endpoints: build => ({
      getAllQuestions: build.query<Question[], void>({
         query: () => 'customer/question',
         transformResponse: (response: RawAPIResponse<Question[]>) =>
            response.data,
      }),
   }),
});

export const { useGetAllQuestionsQuery } = compQuestionsServices;
