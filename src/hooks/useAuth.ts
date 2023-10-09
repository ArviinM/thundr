import { useAppDispatch, useAppSelector } from '@store/index';

import { APIChallengeQuestionResponseData } from '@services/modules/users';

import { authenticate } from '@store/authentication';

const useAuth = () => {
   const authenticationState = useAppSelector(state => state.authentication);
   const dispatch = useAppDispatch();

   const authenticateUser = (params: APIChallengeQuestionResponseData) => {
      dispatch(authenticate(params));
   };

   return {
      authenticationState,
      authenticateUser,
   };
};

export default useAuth;
