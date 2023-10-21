import React from 'react';

import { TextInputProps } from 'react-native';

import styled from 'styled-components/native';

const Container = styled.View`
   display: flex;
   flex-direction: row;
   background-color: white;
   padding: 5px;
   border-radius: 20px;
`;

const TextInput = styled.TextInput`
   flex: 1;
   padding: 5px 10px;
`;

const Text = styled.Text`
   color: #e33051;
   font-weight: 600;
`;

const MyTextInput: React.FC<TextInputProps> = props => {
   return (
      <Container>
         <TextInput {...props} />
      </Container>
   );
};

export default MyTextInput;
