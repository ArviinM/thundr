import React from 'react';

import StandardSkeleton, { StandardSkeletonProps } from './StandardSkeleton';

interface LoginRegistrationSkeletonProps extends StandardSkeletonProps {}

const LoginRegistrationSkeleton: React.FC<
   LoginRegistrationSkeletonProps
> = props => {
   return <StandardSkeleton {...props} />;
};

export default LoginRegistrationSkeleton;
