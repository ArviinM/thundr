import { RootState, AppDispatch } from '@store/index';

import { authenticate, APIResponseOject } from '@store/authentication';

import { useDispatch } from 'react-redux';

const useAuth = () => {
   const dispatch = useDispatch<AppDispatch>();

   const authenticateUser = (params: APIResponseOject) => {
      dispatch(authenticate(params));
   };

   return {
      authenticateUser,
   };
};

export default useAuth;
