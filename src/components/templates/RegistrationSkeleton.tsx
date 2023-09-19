import React from 'react';

import styled from 'styled-components/native';

import {
   type StandardSkeletonProps,
   Container,
   Wrapper,
   FirstSectionContainer as F,
   SecondSectionContainer as S,
   ThirdSectionContainer as T,
} from './StandardSkeleton';

const SampleView = styled.View`
   flex: 1;
   background-color: red;
`;

const SampleView2 = styled.View`
   flex: 1;
   background-color: white;
`;

const SampleView3 = styled.View`
   flex: 1;
   background-color: yellow;
`;

const RegFirstSectionContainer = styled(F)`
   flex: 2;
`;
const RegSecondSectionContainer = styled(S)`
   flex: 3;
`;
const RegThirdSectionContainer = styled(T)`
   flex: 2;
`;

interface RegistrationSkeletonProps extends StandardSkeletonProps {}

const RegistrationSkeleton: React.FC<RegistrationSkeletonProps> = ({
   firstSection,
   secondSection,
   thirdSection,
}) => {
   return (
      <Container>
         <Wrapper>
            <RegFirstSectionContainer>{firstSection}</RegFirstSectionContainer>
            <RegSecondSectionContainer>
               {secondSection}
            </RegSecondSectionContainer>
            <RegThirdSectionContainer>{thirdSection}</RegThirdSectionContainer>
         </Wrapper>
      </Container>
   );
};

export default RegistrationSkeleton;
