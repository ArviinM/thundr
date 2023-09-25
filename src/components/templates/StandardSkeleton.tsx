import React, { ReactElement } from 'react';

import { Platform } from 'react-native';

import styled from 'styled-components/native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

export interface StandardSkeletonProps {
   firstSection: ReactElement;
   secondSection: ReactElement;
   thirdSection: ReactElement;
}

const bgColor: string = '#F2CECD';

export const Container = styled.KeyboardAvoidingView`
   flex: 1;
   align-items: center;
   background-color: ${bgColor};
`;

export const Wrapper = styled.View`
   flex: 1;
   width: 80%;
`;

export const FirstSectionContainer = styled.View`
   flex: 3;
`;
export const SecondSectionContainer = styled.View`
   flex: 2;
`;
export const ThirdSectionContainer = styled.View`
   flex: 1;
`;

const StandardSkeleton: React.FC<StandardSkeletonProps> = ({
   firstSection,
   secondSection,
   thirdSection,
}) => {
   return (
      <Container
         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
         keyboardVerticalOffset={0}
      >
         <Wrapper>
            <FirstSectionContainer>{firstSection}</FirstSectionContainer>
            <SecondSectionContainer>{secondSection}</SecondSectionContainer>
            <ThirdSectionContainer>{thirdSection}</ThirdSectionContainer>
         </Wrapper>
      </Container>
   );
};

export default StandardSkeleton;
