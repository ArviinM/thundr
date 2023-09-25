import React from 'react';

import styled from 'styled-components/native';

import BasicButton from '@atoms/Buttons/Basic';
import PrimaryButton from '@atoms/Buttons/Primary';

const TestingContainer = styled.View`
   flex: 1;
   justify-content: center;
   background-color: palegreen;
`;

const Testing = () => (
   <TestingContainer>
      <BasicButton title="Continue" onPress={() => {}} />
      <PrimaryButton title="Continue" onPress={() => {}} />
   </TestingContainer>
);

export default Testing;
