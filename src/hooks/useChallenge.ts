import { useEffect, useState } from 'react';

import {
   useValidateQuestionMutation,
   ChallengeName,
   ValidateQuestion,
} from '@services/modules/users';

export enum challengeOrigin {
   OTP = 'otp',
   CreatePassword = 'create_password',
}

const useChallenge = (origin: challengeOrigin) => {
   const [validateQuestion, { data }] = useValidateQuestionMutation();

   if (origin === challengeOrigin.OTP) {
   }

   return {
      validateQuestion,
   };
};

export default useChallenge;
