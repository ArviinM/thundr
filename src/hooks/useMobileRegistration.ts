import { useEffect, useState } from 'react';

import {
   useRegisterMobileMutation,
   RegisterMobilePostBody,
   ChallengeName,
   useValidateMobileSSOMutation,
} from '@services/modules/users';

type Props = {
   isLogin: boolean;
};

const useMobileRegistration = (props: Props) => {
   //    const [isLoading, setLoading] = useState<boolean>();
   //    const [isSuccess, setSuccess] = useState<boolean>();
   //    const [data, setData] = useState();
   //    const [error, setError] = useState();
   //    const [isError, setIsError] = useState<boolean>();

   if (!props.isLogin) {
      return useRegisterMobileMutation();
   }

   //    useEffect(() => {
   //       if (props.isLogin) {
   //       }
   //    }, [props.isLogin]);

   //    return {
   //       isLoading,
   //       isSuccess,
   //       data,
   //       error,
   //    };
};

export default useMobileRegistration;
