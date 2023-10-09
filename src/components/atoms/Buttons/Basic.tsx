import React from 'react';

import { PressableProps, TextStyle, StyleProp, ViewStyle } from 'react-native';

import styled from 'styled-components/native';

export const PressableButtonContainer = styled.Pressable`
   padding: 8px 25px;
   border-radius: 10px;
   align-items: center;
   justify-content: center;
   background-color: ${props => (props.disabled ? '#9C9EA1' : 'white')};
`;

const BasicButtonTitle = styled.Text`
   color: #e33051;
`;

export interface BasicButtonProps extends PressableProps {
   title: string;
   textStyles?: TextStyle;
}

const BasicButton: React.FC<BasicButtonProps> = ({ style, ...props }) => {
   return (
      <PressableButtonContainer
         style={({ pressed }) => [
            { opacity: pressed ? 0.8 : 1 },
            style as StyleProp<ViewStyle>,
         ]}
         {...props}
      >
         <BasicButtonTitle style={props.textStyles}>
            {props.title}
         </BasicButtonTitle>
      </PressableButtonContainer>
   );
};
export default BasicButton;
