import React from 'react';

import { TextInputProps } from 'react-native';

import styled from 'styled-components/native';

import { useTheme } from '@hooks';

const Container = styled.View`
   display: flex;
   flex-direction: row;
   background-color: white;
   padding: 5px;
   border-radius: 20px;
`;

const TextInputLeftContainer = styled.View`
   display: flex;
   align-items: center;
   justify-content: center;
   border-right-color: #b1b3b5;
   border-right-width: 1px;
   padding: 0 10px;
   margin: 0;
`;

const TextInput = styled.TextInput`
   flex: 1;
   padding: 5px 10px;
`;

const Text = styled.Text`
   color: #e33051;
   font-weight: 600;
`;

interface IconTextInputProps extends TextInputProps {}

const IconTextInput: React.FC<IconTextInputProps> = props => {
   return (
      <Container>
         <TextInputLeftContainer>
            <Text>+63</Text>
         </TextInputLeftContainer>
         <TextInput {...props} />
      </Container>
   );
};

export default IconTextInput;
